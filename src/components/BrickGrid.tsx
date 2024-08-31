import React, { useEffect, useState, useMemo } from "react";
import Loader from "./Loader";

interface Data {
  id: number;
  title: string;
  description: string;
}

const BrickGrid: React.FC<{ data: Data[]; title?: string }> = ({
  data,
  title,
}) => {
  const [numColumns, setNumColumns] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () =>
      setNumColumns(Math.max(1, Math.floor(window.innerWidth / 290)));

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLines = (text: string, width: number, size = 16, font = "Arial") => {
    if (typeof document === "undefined") return 1;

    const el = document.createElement("span");
    Object.assign(el.style, {
      fontSize: `${size}px`,
      fontFamily: font,
      visibility: "hidden",
      whiteSpace: "nowrap",
    });
    el.textContent = text;
    document.body.appendChild(el);
    const charPerLine = Math.floor(width / (el.offsetWidth / text.length));
    document.body.removeChild(el);
    return Math.ceil(text.length / charPerLine);
  };

  const columns = useMemo(() => {
    if (!isClient) return [];

    const newColumns: Data[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array(numColumns).fill(0);

    data.forEach((item) => {
      const descLines = getLines(item.description.slice(0, 450), 290);
      const titleLines = getLines(item.title, 290);
      const estimatedHeight = (descLines + titleLines) * 16;

      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      newColumns[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] += estimatedHeight;
    });

    return newColumns;
  }, [data, isClient, numColumns]);

  if (!isClient) return <Loader />;

  return (
    <div className="space-y-2">
      <h2 className="text-xs me-auto">{title}</h2>
      <div className="flex w-full gap-4 flex-wrap md:flex-nowrap justify-center">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((item) => (
              <div
                key={item.id}
                className="max-w-[95vw] sm:max-w-[290px] border border-gray-300 bg-white p-4 rounded-xl cursor-pointer relative group space-y-2"
              >
                <h3 className="text-base font-semibold break-words">
                  {item.title}
                </h3>
                <p className="break-words">
                  {item.description.length > 450
                    ? item.description.slice(0, 450) + "..."
                    : item.description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { BrickGrid };
