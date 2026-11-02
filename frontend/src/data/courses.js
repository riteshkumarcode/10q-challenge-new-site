export const coursesData = [];

export const getCourseBySlug = (slug) => {
  if (!slug || !coursesData.length) return null;
  return (
    coursesData.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || String(c.id) === String(slug)
    ) || null
  );
};
