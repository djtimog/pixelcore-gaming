export const handleShare = async (data: {
  title: string;
  text: string;
  url: string;
}) => {
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  } catch (err) {
    console.error("Error sharing:", err);
  }
};
