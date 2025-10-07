export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerText =
    process.env.NEXT_PUBLIC_FOOTER_TEXT ||
    'This website is maintained by ward leadership. For questions or concerns, please contact your ward clerk.'

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            © {currentYear} The Church of Jesus Christ of Latter-day Saints. All rights reserved.
          </p>
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  )
}
