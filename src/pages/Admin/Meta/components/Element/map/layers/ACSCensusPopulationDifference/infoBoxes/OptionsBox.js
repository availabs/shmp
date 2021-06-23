import React from "react"
import * as d3scale from "d3-scale"
import { format as d3format } from "d3-format"
import {Button} from "@availabs/avl-components";

export const drawLegend = (layer, newCanvas, mbCanvas) => {
    const context = newCanvas.getContext("2d")
    context.drawImage(mbCanvas, 0, 0);

    let x = mbCanvas.width - 20 - 360,
        y = 20;

    context.fillRect(x, y, 360, 70);

    x += 10;
    y += 10;

    context.fillRect(x, y, 340, 50);

    x += 10;
    y += 10;

    context.font = "12px 'Helvetica Neue', Arial, Helvetica, sans-serif";
    context.fillStyle = '#ccc'
    const text = layer.legend.Title({layer});
    context.fillText(text, x + 10, y, 320);

    x += 10
    y += 10

    const w = 320 / layer.legend.range.length;
    layer.legend.range.forEach((c, i) => {
        context.fillStyle = c;
        context.fillRect(x + i * w, y, w, 20);
    })

    let scale;

    // eslint-disable-next-line default-case
    switch (layer.legend.type) {
        case "quantile":
            scale = d3scale.scaleQuantile()
                .domain(layer.legend.domain)
                .range(layer.legend.range);
            break;
        case "quantize":
            scale = d3scale.scaleQuantize()
                .domain(layer.legend.domain)
                .range(layer.legend.range);
            break;
    }

    const format = (typeof layer.legend.format === "function") ?
        layer.legend.format :
        d3format(layer.legend.format);

    x += 3;
    y += 33;
    context.font = "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif";
    context.textAlign = "right";
    layer.legend.range.forEach((c, i) => {
        const text = format(scale.invertExtent(c)[1]);
        context.fillText(text, x + w + i * w, y);
    })
    return 0;
}

export default ({ layer }, setImg) => {
    const [fileName, setFileName] = React.useState(layer.filters.census.value);

    const getImageUrl = React.useCallback(() => {
        const canvas = document.querySelector("canvas.mapboxgl-canvas"),
            newCanvas = document.createElement("canvas");

        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        const context = newCanvas.getContext("2d")
        context.drawImage(canvas, 0, 0);

        drawLegend(newCanvas, canvas, layer);
        setImg(newCanvas.toDataURL());
        return newCanvas.toDataURL();
    }, [layer]);

    const saveImage = React.useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
        const anchor = document.createElement("a");

        anchor.setAttribute("href", getImageUrl());
        anchor.setAttribute("download", fileName);
        anchor.click();
    }, [fileName, getImageUrl])

    React.useEffect(() => {
        setFileName(layer.filters.census.value);
    }, [layer.filters.census.value]);

    return (
        <Button className='w-full' onClick={getImageUrl}>
            <i className={'fas fa-save pr-1'} /><span>Save Settings</span>
        </Button>
    )
}