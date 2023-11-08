function useIsEmptyData(obj, loading, error) {
  const isEmpty =
    !loading && !error && Object.keys(obj).length === 0 ? true : false;

  return isEmpty;
}

export default useIsEmptyData;
