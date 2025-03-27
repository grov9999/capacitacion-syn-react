export const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div
      data-testid="loading-spinner"
      role="status"
      className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"
    ></div>
  </div>
);