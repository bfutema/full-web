import React, { useMemo, useState, useCallback } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

import {
  addMonths as addM,
  format as f,
  isToday as today,
  isEqual,
  isBefore,
  isAfter,
} from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import { useContextSelector } from 'use-context-selector';
import { v4 } from 'uuid';

import { ThemeContext } from '@contexts/ReactThemeContext';
import { getCalendarDates, IDate } from '@utils/getCalendarDates';

import { Container, Control, Dates, Header, Days, Day, IDay } from './styles';

interface ICalendarContainerProps {
  calendarIsShow: boolean;
  startDate: Date;
  selectedDate?: Date;
  selectedDates?: Date[];
  direction?: { vertical: 'UP' | 'DOWN'; horizontal: 'LEFT' | 'RIGHT' };
  onPrev: () => void;
  onNext: () => void;
  onSelect: (day: IDate) => void;
}

const CalendarContainer: React.FC<ICalendarContainerProps> = ({
  calendarIsShow,
  startDate,
  selectedDate,
  selectedDates,
  direction,
  onPrev,
  onNext,
  onSelect,
}) => {
  const { quarter } = useContextSelector(ThemeContext, state => state.colors);

  const [hoveredDate, setHoveredDate] = useState<Date>();

  const header = useMemo(() => {
    const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    if (selectedDates) return [{ days }, { days }];

    return [{ days }];
  }, [selectedDates]);

  const start = useMemo(() => {
    return {
      Month: f(startDate, 'MMM', { locale }),
      Year: f(startDate, 'yyyy', { locale }),
    };
  }, [startDate]);

  const end = useMemo(() => {
    return {
      Month: f(addM(startDate, 1), 'MMM', { locale }),
      Year: f(addM(startDate, 1), 'yyyy', { locale }),
    };
  }, [startDate]);

  const dates = useMemo(() => {
    if (selectedDates) {
      return [
        { key: 'start', item: getCalendarDates(startDate) },
        { key: 'end', item: getCalendarDates(addM(startDate, 1)) },
      ];
    }

    return [{ key: 'start', item: getCalendarDates(startDate) }];
  }, [selectedDates, startDate]);

  const onClick = useCallback(
    (day: IDate) => {
      setHoveredDate(undefined);
      onSelect(day);
    },
    [onSelect],
  );

  const getProps = useCallback(
    (index: number, day: IDate): IDay => {
      if (selectedDates) {
        const on = day.isShow
          ? {
              onClick: () => onClick(day),
              onMouseEnter: () =>
                selectedDates.length < 2 && setHoveredDate(day.date),
            }
          : {};

        return {
          key: v4(),
          index,
          day,
          type: 'button',
          ...on,
          isToday: today(day.date),
          isSelected:
            selectedDates.length === 0
              ? false
              : selectedDates.length === 1
              ? isEqual(day.date, selectedDates[0])
              : selectedDates.length === 2
              ? isEqual(day.date, selectedDates[0]) ||
                isEqual(day.date, selectedDates[1])
              : false,
          isHovered:
            selectedDates.length === 0
              ? false
              : hoveredDate
              ? isAfter(day.date, selectedDates[0]) &&
                isBefore(day.date, hoveredDate)
              : isAfter(day.date, selectedDates[0]) &&
                isBefore(day.date, selectedDates[1]),
        };
      }

      const on = day.isShow ? { onClick: () => onClick(day) } : {};

      return {
        key: v4(),
        index,
        day,
        type: 'button',
        ...on,
        isToday: today(day.date),
        isSelected: selectedDate ? isEqual(day.date, selectedDate) : false,
        isHovered: false,
      };
    },
    [selectedDates, hoveredDate, selectedDate, onClick],
  );

  return (
    <Container
      direction={direction}
      isDateRange={!!selectedDates}
      calendarIsShow={calendarIsShow}
    >
      <Control isDateRange={!!selectedDates}>
        <button type="button" onClick={onPrev}>
          <HiOutlineChevronLeft size={32} color={quarter[500]} />
        </button>

        <div>
          <button type="button">
            <strong>{start.Month}</strong>
          </button>

          <button type="button">
            <strong>{start.Year}</strong>
          </button>
        </div>

        {selectedDates && (
          <div>
            <button type="button">
              <strong>{end.Month}</strong>
            </button>

            <button type="button">
              <strong>{end.Year}</strong>
            </button>
          </div>
        )}

        <button type="button" onClick={onNext}>
          <HiOutlineChevronRight size={32} color={quarter[500]} />
        </button>
      </Control>

      <Dates isDateRange={!!selectedDates}>
        {header.map(item => (
          <Header key={v4()}>
            {item.days.map(day => (
              <strong key={v4()}>{day}</strong>
            ))}
          </Header>
        ))}

        {dates.map(({ item }) => (
          <Days key={v4()}>
            {item.map((day, index) => (
              <Day {...getProps(index, day)}>{day.date.getDate()}</Day>
            ))}
          </Days>
        ))}
      </Dates>
    </Container>
  );
};

export { CalendarContainer };
