const MessageBubble = ({ message, type }) => {
  return (
    <div className={`bubble ${type}`}>
      {message}
    </div>
  );
};

export default MessageBubble;