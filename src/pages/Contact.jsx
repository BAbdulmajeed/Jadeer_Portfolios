export default function Contact() {
  return (
    // Contact page component for allowing users to send inquiries and feedback.
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you. Send us a message
          and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="contact-card">

        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
          />

          <label>Message</label>
          <textarea
            rows="6"
            placeholder="Write your message..."
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}