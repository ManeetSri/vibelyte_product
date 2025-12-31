export function generateSubtasks(module) {
  const map = {
    Authentication: ["Login API", "OTP Flow", "Session Handling"],
    Chat: ["WebSocket Setup", "Send Message", "Read Receipts"],
    Discovery: ["Interest Matching", "Ranking Logic"],
  };

  return map[module] || ["Implement API", "Add Tests"];
}
