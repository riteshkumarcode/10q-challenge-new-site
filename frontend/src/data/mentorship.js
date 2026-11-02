export const mentorshipData = [];

export const getMentorshipBySlug = (slug) => {
  if (!slug || !mentorshipData.length) return null;
  return (
    mentorshipData.find(
      (m) => m.slug.toLowerCase() === slug.toLowerCase() || String(m.id) === String(slug)
    ) || null
  );
};
