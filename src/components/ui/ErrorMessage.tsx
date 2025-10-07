interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export default function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
      {retry && (
        <button onClick={retry} className="btn btn-secondary">
          Try Again
        </button>
      )}
    </div>
  )
}
