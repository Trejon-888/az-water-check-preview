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
    { language: "en", approved: false, name: "", src: "", poster: "", captions: "" },
    { language: "es", approved: false, name: "", src: "", poster: "", captions: "" }
  ],
  // Lewis owns the new GHL flow. Do not substitute the archived booking URL.
  booking: { approved: false, embedUrl: "" }
};
