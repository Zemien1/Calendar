import { GriffelStyle, Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { CircleFilled, Copy16Regular } from '@fluentui/react-icons';
import { ShiftStatus, colorMap, statusMap } from '../lib/shiftStatus';
import { Shift } from './Calendar';
import { useState } from 'react';

export const ShiftTile = (props: { shift: Shift; isCondensed: boolean; }) => {
  const styles = useStyles();
  const statusClass = statusMap[props.shift.status] as ShiftStatus;
  const [copied, setCopied] = useState(false); // Stan dla komunikatu "Copied!"
  const [showCopyIcon, setShowCopyIcon] = useState(false); // Stan do zarządzania widocznością ikony

  const handleCopyClick = (event: React.MouseEvent, providerName: string) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(providerName);
    setCopied(false);
    setTimeout(() => setCopied(false), 2000); // Komunikat "Copied!" na 2 sekundy
  };

  return (
    <a
      href={`/main.aspx?pagetype=entityrecord&etn=ava_shifts&id=${props.shift.id}`}
      target='_parent'
      className={mergeClasses(styles.button, styles[statusClass])}
      onMouseEnter={() => setShowCopyIcon(true)}  // Pokaż ikonę kopiowania po najechaniu
      onMouseLeave={() => setShowCopyIcon(false)} // Ukryj ikonę kopiowania po opuszczeniu
    >
      <div className={mergeClasses(styles.providerContainer, showCopyIcon && styles.hoverEffect)}> {/* Dodaj efekt podświetlenia na kontener */}
        <Text className={styles.titleText} size={200} weight="bold">
          {props.shift.nurse}
        </Text>
        {showCopyIcon && (  // Warunkowe renderowanie ikony kopiowania
          <Copy16Regular 
            className={styles.copyIcon} 
            onClick={(event) => handleCopyClick(event, props.shift.nurse)} 
            title="Copy to clipboard" 
          />
        )}
        {copied && <Text size={100} className={styles.copiedText}>Copied!</Text>}
      </div>

      <div className={styles.costAndCp}>
        <Text size={200} weight="medium">
          ${props.shift.cost}/hr
        </Text>
        {props.shift.sh_origin === true && (
          <Text className={styles.cpText} weight="medium">CP</Text>
        )}
      </div>
      {props.isCondensed ? (
        <CircleFilled
          primaryFill={props.shift.job?.color ?? 'white'}
          className={mergeClasses(styles.circleIcon, styles.iconCondensedPositioning)}
        />
      ) : (
        <div className={styles.jobDescription}>
          <CircleFilled
            primaryFill={props.shift.job?.color ?? 'white'}
            className={mergeClasses(styles.circleIcon, styles.iconNotCondensedPositioning)}
          />
          <Text size={200}>{props.shift.job?.name}</Text>
        </div>
      )}
    </a>
  );
};

export const stylesByStatus = Object.fromEntries(
  Object.entries(colorMap).map(([status, color]) => [
    status as ShiftStatus, {
      ...shorthands.border('1px', 'solid', color),
      ...shorthands.borderLeft('10px', 'solid', color),
    }]
  )) as Record<ShiftStatus, GriffelStyle>;

const useStyles = makeStyles({
  button: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#384848',
    cursor: 'pointer',
    textDecorationLine: 'none',
    ...shorthands.padding('4px', '18px', '4px', '6px'),
    ...shorthands.gap('4px'),
    ...shorthands.margin('2px', 0),
    ...shorthands.borderRadius('4px'),
  },
  titleText: {
    color: '#000036',
    transitionProperty: 'color', // Rozbicie transition
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease',
    ':hover': {
      color: '#000036',
    }
  },

  providerContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('3px'),
    position: 'relative',
  },

  hoverEffect: {  // Styl dla podświetlenia
    backgroundColor: '#f0f0f0',  // Podświetlenie kontenera
    ...shorthands.borderRadius('4px'),        // Dodaj obramowanie, aby podświetlenie było ładne
  },

  copyIcon: {
    cursor: 'pointer',
    fontSize: '16px',
    color: '#615ec5',
    transitionProperty: 'color', // Rozbicie transition
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease',
    ':hover': {
      color: '#4b4bb5',
    },
  },

  copiedText: {
    color: '#0078D4',
  },

  costAndCp: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  circleIcon: {
    minHeight: '13px',
    minWidth: '13px',
  },
  iconCondensedPositioning: {
    position: 'absolute',
    top: '4px',
    right: '4px',
  },
  iconNotCondensedPositioning: {
    marginTop: '1px',
  },
  jobDescription: {
    width: '100%',
    display: 'flex',
    ...shorthands.gap('3px')
  },
  cpText: {
    marginLeft: 'auto',
    color: 'black',
  },
  ...stylesByStatus,
});
