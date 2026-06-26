const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const p1 = priorityMap[a.Type] || 0;
    const p2 = priorityMap[b.Type] || 0;

    if (p1 !== p2) {
      return p2 - p1;
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}