import { createPortal } from 'react-dom';
interface IPortalProps {
    children: React.ReactNode
}

export const Portal = ({children}: IPortalProps) => {
    const portalRoot = document.getElementById('portal-root');
    return (
        portalRoot && createPortal(
            children,
            portalRoot
        )

    )
}
