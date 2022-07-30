import { isLastDayOfMonth } from 'date-fns';
import styled, { css } from 'styled-components';

import { ITheme } from '@interfaces/generic/ITheme';
import { IDate } from '@utils/getCalendarDates';

interface IContainerProps {
  isDateRange: boolean;
  calendarIsShow: boolean;
  direction?: { vertical: 'UP' | 'DOWN'; horizontal: 'LEFT' | 'RIGHT' };
}

const containerVariations = {
  top: css`
    bottom: calc(36px + 32px);
  `,
  down: css`
    top: calc(36px + 32px);
  `,
  left: css`
    left: 0;
  `,
  right: css`
    right: 0;
  `,
};

export const Container = styled.div.attrs({
  className: 'components-quarks-input-calendar_container',
})<IContainerProps>`
  ${({
    theme,
    isDateRange,
    calendarIsShow,
    direction = { vertical: 'DOWN', horizontal: 'RIGHT' },
  }) => css`
    /* width: ${isDateRange ? '632px' : '316px'}; */
    width: ${isDateRange ? '596px' : '316px'};
    height: fit-content;

    outline: 1px solid ${theme.colors.quarter[500]};
    border-radius: ${theme.borders.radii[100]};
    /* background: ${theme.colors.white.normal}; */
    background: ${theme.colors.black.lighter};
    box-shadow: 0px 6px 4px rgba(27, 32, 60, 0.2);

    position: absolute;

    opacity: ${calendarIsShow ? 1 : 0} !important;
    visibility: ${calendarIsShow ? 'visible' : 'hidden'} !important;
    pointer-events: ${calendarIsShow ? 'initial' : 'none'};

    transition: all 400ms;

    z-index: 10;

    ${direction.vertical === 'UP' && containerVariations.top}
    ${direction.vertical === 'DOWN' && containerVariations.down}
    ${direction.horizontal === 'LEFT' && containerVariations.left}
    ${direction.horizontal === 'RIGHT' && containerVariations.right}
  `}
`;

type IControlProps = Pick<IContainerProps, 'isDateRange'>;

export const Control = styled.div.attrs({
  className: 'components-quarks-input-calendar_container_control',
})<IControlProps>`
  ${({ theme, isDateRange }) => css`
    width: 100%;

    padding: 16px;

    gap: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: none;
      outline: none;
      background: none;

      transition: all 400ms;

      &:hover {
        filter: brightness(1.4);
      }
    }

    div {
      width: 100%;
      height: 32px;

      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      &:first-of-type {
        margin-right: ${isDateRange ? '48px' : '0'};
      }

      &:last-of-type {
        margin-left: ${isDateRange ? '48px' : '0'};
      }

      button strong {
        color: ${theme.colors.text.default};
        font-weight: bold;
        text-transform: capitalize;

        position: relative;

        transition: all 400ms;

        &:after {
          content: '';

          width: 0%;
          height: 2px;

          background: ${theme.colors.quarter[500]};

          position: absolute;
          left: 0;
          bottom: -2px;

          transition: all 400ms;
        }

        &:hover {
          color: ${theme.colors.quarter[500]};

          &:after {
            width: 100%;
          }
        }
      }
    }
  `}
`;

type IDatesProps = Pick<IContainerProps, 'isDateRange'>;

export const Dates = styled.div.attrs({
  className: 'components-quarks-input-calendar_container_dates',
})<IDatesProps>`
  ${({ isDateRange }) => css`
    width: 100%;
    height: 100%;

    padding: 0 24px 24px 24px;

    column-gap: 32px;
    row-gap: 8px;
    display: grid;
    grid-template-columns: ${isDateRange ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;

    gap: 13px;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    strong {
      width: 24px;

      color: ${theme.colors.input.normal.label};
      font-size: 14px;
      font-weight: bold;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

export const Days = styled.div`
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export interface IDay extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  key: string;
  index: number;
  day: IDate;
  isToday: boolean;
  isSelected: boolean;
  isHovered: boolean;
}

const dayVariations = (theme: ITheme, index: number, day: IDate) => ({
  hide: css`
    background: transparent !important;
    border-top: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;

    ${isLastDayOfMonth(day.date) &&
    css`
      border-right: 1px solid ${theme.colors.black.darker} !important;
    `}

    ${index > 27 &&
    css`
      border-bottom: 0 !important;
    `}

    color: transparent !important;

    &:hover {
      border-color: ${theme.colors.black.darker};
      background: transparent;

      color: transparent;

      cursor: initial;
    }

    &:after,
    &:before {
      display: none !important;
    }
  `,
  today: css`
    color: ${theme.colors.quarter[500]};
    font-weight: bold;
  `,
  selected: css`
    border-color: ${theme.colors.quarter[500]};
    background: ${theme.colors.quarter[500]};

    color: ${theme.colors.text.default};
    font-weight: bold;

    &:after {
      opacity: 1;
      visibility: visible;
    }

    &:before {
      opacity: 1;
      visibility: visible;
    }
  `,
  hovered: css`
    border-color: ${theme.colors.quarter[500]} !important;
    background: ${theme.colors.quarter[500]}4d;

    &:after {
      opacity: 1;
      visibility: visible;
    }

    &:before {
      opacity: 1;
      visibility: visible;
    }
  `,
});

export const Day = styled.button<IDay>`
  ${({ theme, index, day, isToday, isSelected, isHovered }) => css`
    width: 100%;
    height: 100%;
    max-height: 38px;
    min-height: 38px;

    border: 1px solid ${theme.colors.black.darker};
    background: ${theme.colors.black.lighter};

    color: ${theme.colors.text.default};
    font-size: 14px;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;

    transition: all 400ms;

    & + button {
      border-top: ${index > 5
        ? '0px'
        : `1px solid ${theme.colors.black.darker}`};
      border-left: ${index === 6
        ? `1px solid ${theme.colors.black.darker}`
        : index === 13
        ? `1px solid ${theme.colors.black.darker}`
        : index === 20
        ? `1px solid ${theme.colors.black.darker}`
        : index === 27
        ? `1px solid ${theme.colors.black.darker}`
        : index === 34
        ? `1px solid ${theme.colors.black.darker}`
        : '0px'};
    }

    &:after {
      content: '';

      width: calc(100% + 2px);
      height: 1px;

      background: ${theme.colors.quarter[500]};

      position: absolute;
      top: -1px;
      left: -1px;

      transition: all 400ms;

      opacity: 0;
      visibility: hidden;
    }

    &:before {
      content: '';

      width: 1px;
      height: calc(100% + 2px);

      background: ${theme.colors.quarter[500]};

      position: absolute;
      top: -1px;
      left: -1px;

      transition: all 400ms;

      opacity: 0;
      visibility: hidden;
    }

    &:hover {
      border-color: ${theme.colors.quarter[500]};
      background: ${theme.colors.quarter[500]};

      color: ${theme.colors.white.normal};
      font-weight: bold;

      cursor: pointer;

      &:before,
      &:after {
        opacity: 1;
        visibility: visible;
      }
    }

    ${!day.isShow && dayVariations(theme, index, day).hide}
    ${isToday && dayVariations(theme, index, day).today}
    ${day.isShow && isHovered && dayVariations(theme, index, day).hovered}
    ${isSelected && dayVariations(theme, index, day).selected}
  `}
`;
