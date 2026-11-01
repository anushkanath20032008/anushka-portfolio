import React from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../lib/content';
import { Window } from './Window';
import { useIsDesktop } from './hooks';

export const NowWindow: React.FC = () => {
  const { id } = useParams();
  const { content } = useContent();
  const desktop = useIsDesktop();
  const item = content.now.find((n) => n.id === id);

  return (
    <Window title={item?.label ?? 'Not found'} fullScreen={!desktop}>
      <div className="scroll-thin h-full overflow-y-auto p-6 text-[#1F2430]">
        {item ? (
          <>
            <p className="font-hand text-3xl leading-none">{item.statusText}</p>
            {typeof item.progress === 'number' && (
              <div className="mt-4" aria-label={`Progress ${item.progress}%`}>
                <div className="h-3 overflow-hidden rounded-full border-2 border-[#1F2430] bg-[#EFE6D4]">
                  <div className="h-full bg-[#3ECF8E]" style={{ width: `${item.progress}%` }} />
                </div>
                <p className="mt-1 text-xs text-[#1F2430]/60">Work in progress, about {item.progress}% to first release</p>
              </div>
            )}
            {item.detail && <p className="mt-4 max-w-xl leading-relaxed">{item.detail}</p>}
          </>
        ) : (
          <p>That item no longer exists. Press Esc to return to the desktop.</p>
        )}
      </div>
    </Window>
  );
};
