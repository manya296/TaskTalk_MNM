const AnalysisPanel = ({ data }) => {
  if (!data) return <div className="analysis">No Data</div>;

  return (
    <div className="analysis">
      <h3>NLP Analysis</h3>

      <p><b>Customer:</b> {data.customerName}</p>
      <p><b>Item:</b> {data.item}</p>
      <p><b>Quantity:</b> {data.quantity}</p>
    </div>
  );
};

export default AnalysisPanel;