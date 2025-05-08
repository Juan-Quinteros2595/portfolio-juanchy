import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, idea, recaptchaToken, bypassRecaptcha } = await req.json();

    // Validar API key de Resend
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // Validación más estricta
    if (!name?.trim() || !email?.trim() || !idea?.trim()) {
      return NextResponse.json(
        { error: "Todos los campos marcados son obligatorios" },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor, introduce un email válido" },
        { status: 400 }
      );
    }

    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (recaptchaToken && recaptchaSecretKey && recaptchaSecretKey !== "your_secret_key_here") {
      const recaptchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        return NextResponse.json(
          { error: "Verificación de seguridad fallida" },
          { status: 400 }
        );
      }
    }

    // Enviar el email con mejor manejo de errores
    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <noreply@jnch.media>",
        to: [process.env.EMAIL_TO || "tu-email@ejemplo.com"],
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
          <p><strong>Idea/Proyecto:</strong> ${idea}</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return NextResponse.json({ success: true, data });

    } catch (emailError) {
      return NextResponse.json(
        { error: "Error al enviar el email. Por favor, inténtalo de nuevo." },
        { status: 500 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : "Error interno del servidor"
      },
      { status: 500 }
    );
  }
}
