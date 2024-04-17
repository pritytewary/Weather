export type IAppError = {
  errorType: string;
  message: string;
};

export function withAppErrorHandling<T extends (...args: any[]) => any>(
  fn: T
): (
  ...args: Parameters<T>
) => Promise<[Awaited<ReturnType<T>>, null] | [null, IAppError]> {
  return async (
    ...args: Parameters<T>
  ): Promise<[Awaited<ReturnType<T>>, null] | [null, IAppError]> => {
    try {
      const data: Awaited<ReturnType<T>> = await fn(...args);
      return [data, null];
    } catch (error: any) {
      return [
        null,
        {
          errorType: error.name, // 'error.name' is the type of the error
          message: error.message, // 'error.message' is the error msg
        },
      ];
    }
  };
}
