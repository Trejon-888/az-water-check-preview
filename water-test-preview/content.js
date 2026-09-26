// Add only approved Aquafeel customer evidence. Keep private source notes outside dist/.
// Set approved:true only after attribution, permission and the source have been checked.
window.AQUAFEEL_CONTENT = {
  reviewMode: true,
  defaultLanguage: "en",
  reviews: [
    { platform: "Google", approved: false, quote: "", author: "", sourceUrl: "" },
    { platform: "Yelp", approved: false, quote: "", author: "", sourceUrl: "" },
    { platform: "Trustpilot", approved: false, quote: "", author: "", sourceUrl: "" }
  ],
  videos: [
    // Spoken language: Spanish (captions are burned into the video). Vertical 9:16 phone recording.
    { language: "es", approved: true, orientation: "portrait", hideLabel: true, name: "", src: "assets/testimonial-es.mp4", poster: "assets/testimonial-es-poster.jpg", captions: "" },
    // Hidden until a second customer video is supplied. Remove hidden:true to show the pending card again.
    { language: "en", approved: false, hidden: true, name: "", src: "", poster: "", captions: "" }
  ],
  // Lewis owns the new GHL flow. Do not substitute the archived booking URL.
  booking: { approved: false, embedUrl: "" }
};
