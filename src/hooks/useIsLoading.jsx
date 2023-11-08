function useIsLoading(loading, error) {
  const isLoading = loading && !error ? true : false;
  return isLoading;
}

export default useIsLoading;
