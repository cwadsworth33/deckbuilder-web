import React, { useState } from "react"

export const Tooltip: React.FC<TooltipProps> = ({position}) => {
  return (
    <div className="absolute bg-orange-dull text-black rounded-md px-2" style={{
      bottom: '-100%',
      marginLeft: '-60px',
      width: '120px'
    }}>
      <h4>New Deck</h4>
    </div>
  )
}

export const TooltipContainer: React.FC<TooltipContainerProps> = ({children, Tooltip}) => {

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const showTooltip = () => {
    console.log('showing tooltip!')
    setTooltipVisible(true)
  };
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {tooltipVisible ? <Tooltip /> : null}
    </div>
  )
}

type TooltipContainerProps = {
  Tooltip: React.FC<TooltipProps>
};

export enum TooltipTriggers {
  hover = 'hover',
  click = 'click'
}

type TooltipProps = {
  position?: TooltipPosition,
  visible?: boolean
}

export enum TooltipPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom'
}