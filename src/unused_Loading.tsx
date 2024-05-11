import "./Loading.css";
export default function Loading({ loaderDimensions }: { loaderDimensions: number }) {
  return (
    <div id="loaders">
      <div
        className="loader loader-left"
        style={{ height: loaderDimensions, width: loaderDimensions }}
      ></div>
      <div
        className="loader loader-right"
        style={{ height: loaderDimensions, width: loaderDimensions }}
      ></div>
      <div
        className="loader loader-left"
        style={{ height: loaderDimensions, width: loaderDimensions }}
      ></div>
    </div>
  );
}
