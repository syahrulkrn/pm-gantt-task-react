import React, { useMemo } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";

const localeDateStringCache: any = {};
const toLocaleDateStringFactory =
  (locale: string) =>
  (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions);
      localeDateStringCache[key] = lds;
    }
    return lds;
  };

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  maxWordLength?: number;
  expanderMargin?: number;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  maxWordLength = 20,
  expanderMargin,
}) => {
  const dynamicWidth = `${parseInt(rowWidth) + maxWordLength}px`;

  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  return (
    <div className={styles.taskListWrapper} style={{ fontFamily, fontSize }}>
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{ minWidth: dynamicWidth }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  style={{ marginLeft: expanderMargin }}
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div className={styles.tooltipContainer}>
                  <span className={styles.taskName}>{t.name}</span>
                </div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{ minWidth: rowWidth, maxWidth: rowWidth }}
            >
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{ minWidth: rowWidth, maxWidth: rowWidth }}
            >
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
