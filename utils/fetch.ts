export const FETCH_TIMEOUT = 8000; // 8 segundos

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export const fetchWithTimeout = async (url: string, options: RequestInit) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new FetchError(
        'La petición falló',
        response.status,
        response.statusText
      );
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new FetchError('La petición excedió el tiempo de espera');
    }
    if (error instanceof FetchError) {
      throw error;
    }
    // Si es un error desconocido
    throw new FetchError('Error inesperado en la petición');
  } finally {
    clearTimeout(timeout);
  }
};