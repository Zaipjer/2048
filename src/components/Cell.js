import React from 'react';

const Cell = ({ num }) => {

    const getColors = (num) => {
        switch (num) {
            case 2:
              return "#eee4da";
            case 4:
              return "#eee1c9";
            case 8:
              return "#f3b27a";
            case 16:
              return "#f69664";
            case 32:
              return "#f77c5f";
            case 64:
              return "#f75f3b";
            case 128:
              return "#edd073";
            case 256:
              return "#edcc62";
            case 512:
              return "#edc950";
            case 1024:
              return "#eecc33";
            case 2048:
              return "#eecc22";
            default:
              return "rgba(238, 228, 218, 0.35)";
          }
    }

    return (
        <div
            className="cell"
            style={{
                background: getColors(num),
                color: num > 4 && "#f9f6f2",
                fontSize: num >= 128 && "45px",
            }}
        >
            {num !== 0 ? num : ""}
        </div>
    );
}

export default Cell;