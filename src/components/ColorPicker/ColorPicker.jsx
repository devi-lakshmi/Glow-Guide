import iro from "@jaames/iro";
import { useEffect, useRef } from "react";
import styles from "./color-picker.module.css";

export default function ColorPicker({
  colorPicker,
  setColors,
  colors,
  description,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!colorPicker.current) {
      colorPicker.current = new iro.ColorPicker(ref.current, {
        width: 350,
        colors: colors,
        handleRadius: 10,
        activeHandleRadius: 13,
        borderWidth: 1,
        borderColor: "#000",
      });

      colorPicker.current.on("color:change", () => {
        const updatedColors = colorPicker.current.colors.map(
          (c) => c.hexString
        );
        setColors(updatedColors);
      });
    }
  }, [colors]);

  return (
    <section className={styles.container}>
      <div ref={ref} />
      <div>
        <h2 className={styles.title}>
          {description ? "Description for matching colors" : null}
        </h2>

        <p className={styles.text}>
          {description ??
            "Fill out the form below to get advice on glowing color combinations for your chosen context."}
        </p>
      </div>
    </section>
  );
}
