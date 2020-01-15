let key = 0;

const defaultOptions = {
  type: "info",
  content: undefined,
  onClose: undefined
};

export default function createMessage(options) {
  return {
    ...defaultOptions,
    ...options,
    key: key++
  };
}
