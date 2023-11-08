function useIsError(loading, error) {
  const isError = error && !loading ? true : false;
  return isError;
}

export default useIsError;
