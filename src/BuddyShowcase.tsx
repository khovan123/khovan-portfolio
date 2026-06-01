import React from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";

export type ThemeMode = "light" | "dark";

const buddyGalleryImages = [
  { lightSrc: "/buddy/landing.png", darkSrc: "/buddy/dark-landing.png", label: "Landing" },
  { lightSrc: "/buddy/home.png", darkSrc: "/buddy/dark-home.png", label: "Home" },
  { lightSrc: "/buddy/explore-resource.png", darkSrc: "/buddy/dark-explore-resource.png", label: "Explore" },
  { lightSrc: "/buddy/billing.png", darkSrc: "/buddy/dark-billing.png", label: "Billing" },
  { lightSrc: "/buddy/modal-create.png", darkSrc: "/buddy/dark-modal-create.png", label: "Create" },
  { lightSrc: "/buddy/login.png", darkSrc: "/buddy/dark-login.png", label: "Login" },
];

const initialBuddyOrbitPositions = [
  { x: 7, y: 7, tilt: -8 },
  { x: 70, y: 7, tilt: 5 },
  { x: 76, y: 61, tilt: 7 },
  { x: 5, y: 63, tilt: 5 },
  { x: 4, y: 42, tilt: -5 },
  { x: 58, y: 70, tilt: -6 },
];

function getBuddyImage(image: (typeof buddyGalleryImages)[number], themeMode: ThemeMode) {
  return {
    ...image,
    src: themeMode === "dark" ? image.darkSrc : image.lightSrc,
    tone: themeMode,
  };
}

export default function BuddyShowcase({ themeMode }: { themeMode: ThemeMode }) {
  const showcaseRef = React.useRef<HTMLDivElement | null>(null);
  const orbitStageRef = React.useRef<HTMLDivElement | null>(null);
  const scrollGuardRef = React.useRef<{ scrollY: number } | null>(null);
  const dragStateRef = React.useRef<{
    index: number;
    pointerId: number;
    startClientX: number;
    startClientY: number;
    grabOffsetX: number;
    grabOffsetY: number;
    currentX: number;
    currentY: number;
    element: HTMLButtonElement;
    stage: HTMLDivElement;
    moved: boolean;
  } | null>(null);
  const suppressOrbitClickRef = React.useRef(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [changeKey, setChangeKey] = React.useState(0);
  const [stageActive, setStageActive] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState<number | null>(null);
  const [modalClosing, setModalClosing] = React.useState(false);
  const [orbitPositions, setOrbitPositions] = React.useState(initialBuddyOrbitPositions);
  const selectedImage = getBuddyImage(buddyGalleryImages[selectedIndex], themeMode);
  const modalImage = modalIndex === null ? null : getBuddyImage(buddyGalleryImages[modalIndex], themeMode);

  const preventDragScroll = React.useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const restoreDragScroll = React.useCallback(() => {
    const guard = scrollGuardRef.current;
    if (!guard || window.scrollY === guard.scrollY) return;

    window.scrollTo(0, guard.scrollY);
  }, []);

  const beginDragScrollGuard = React.useCallback(() => {
    if (scrollGuardRef.current) return;

    scrollGuardRef.current = { scrollY: window.scrollY };
    document.documentElement.classList.add("is-dragging-orbit");
    document.body.classList.add("is-dragging-orbit");
    window.addEventListener("wheel", preventDragScroll, { passive: false });
    window.addEventListener("touchmove", preventDragScroll, { passive: false });
    window.addEventListener("scroll", restoreDragScroll, { passive: true });
  }, [preventDragScroll, restoreDragScroll]);

  const endDragScrollGuard = React.useCallback(() => {
    if (!scrollGuardRef.current) return;

    document.documentElement.classList.remove("is-dragging-orbit");
    document.body.classList.remove("is-dragging-orbit");
    scrollGuardRef.current = null;
    window.removeEventListener("wheel", preventDragScroll);
    window.removeEventListener("touchmove", preventDragScroll);
    window.removeEventListener("scroll", restoreDragScroll);
  }, [preventDragScroll, restoreDragScroll]);

  const closeModal = React.useCallback(() => {
    if (modalIndex === null) return;

    setModalClosing(true);
    window.setTimeout(() => {
      setModalIndex(null);
      setModalClosing(false);
    }, 280);
  }, [modalIndex]);

  const selectImage = React.useCallback((imageIndex: number) => {
    setSelectedIndex(imageIndex);
    setChangeKey((current) => current + 1);
  }, []);

  const openOrbitImage = React.useCallback(
    (imageIndex: number) => {
      selectImage(imageIndex);
      setModalIndex(imageIndex);
      setModalClosing(false);
    },
    [selectImage],
  );

  const moveOrbitDrag = React.useCallback(
    (event: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      event.preventDefault();
      const rect = drag.stage.getBoundingClientRect();
      const cardRect = drag.element.getBoundingClientRect();
      const pointerTravel = Math.abs(event.clientX - drag.startClientX) + Math.abs(event.clientY - drag.startClientY);
      if (pointerTravel <= 8) return;

      if (!drag.moved) {
        drag.moved = true;
        drag.element.classList.add("is-dragging");
      }

      const nextLeftPx = event.clientX - rect.left - drag.grabOffsetX;
      const nextTopPx = event.clientY - rect.top - drag.grabOffsetY;
      const nextX = Math.min(100 - (cardRect.width / rect.width) * 100, Math.max(0, (nextLeftPx / rect.width) * 100));
      const nextY = Math.min(100 - (cardRect.height / rect.height) * 100, Math.max(0, (nextTopPx / rect.height) * 100));

      drag.currentX = nextX;
      drag.currentY = nextY;
      drag.element.style.setProperty("--orbit-x", `${nextX}%`);
      drag.element.style.setProperty("--orbit-y", `${nextY}%`);
      restoreDragScroll();
    },
    [restoreDragScroll],
  );

  const finishOrbitDrag = React.useCallback(
    (event: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      if (drag.moved) {
        selectImage(drag.index);
        setOrbitPositions((current) =>
          current.map((position, positionIndex) =>
            positionIndex === drag.index ? { ...position, x: drag.currentX, y: drag.currentY } : position,
          ),
        );
        drag.element.classList.remove("is-dragging");
      } else {
        openOrbitImage(drag.index);
      }

      endDragScrollGuard();
      suppressOrbitClickRef.current = true;
      window.setTimeout(() => {
        suppressOrbitClickRef.current = false;
      }, 0);
      dragStateRef.current = null;
      window.removeEventListener("pointermove", moveOrbitDrag);
      window.removeEventListener("pointerup", finishOrbitDrag);
      window.removeEventListener("pointercancel", finishOrbitDrag);
    },
    [endDragScrollGuard, moveOrbitDrag, openOrbitImage, selectImage],
  );

  React.useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStageActive(true);
          return;
        }

        setStageActive(false);
        setSelectedIndex(0);
        setModalIndex(null);
        setModalClosing(false);
        setChangeKey((current) => current + 1);
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (modalIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal, modalIndex]);

  React.useEffect(() => {
    return () => {
      endDragScrollGuard();
      window.removeEventListener("pointermove", moveOrbitDrag);
      window.removeEventListener("pointerup", finishOrbitDrag);
      window.removeEventListener("pointercancel", finishOrbitDrag);
    };
  }, [endDragScrollGuard, finishOrbitDrag, moveOrbitDrag]);

  const onOrbitPointerDown = (event: React.PointerEvent<HTMLButtonElement>, imageIndex: number) => {
    const stage = orbitStageRef.current;
    if (!stage) return;

    event.preventDefault();
    const cardRect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    beginDragScrollGuard();
    setSelectedIndex(imageIndex);
    dragStateRef.current = {
      index: imageIndex,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      grabOffsetX: event.clientX - cardRect.left,
      grabOffsetY: event.clientY - cardRect.top,
      currentX: orbitPositions[imageIndex].x,
      currentY: orbitPositions[imageIndex].y,
      element: event.currentTarget,
      stage,
      moved: false,
    };

    window.addEventListener("pointermove", moveOrbitDrag, { passive: false });
    window.addEventListener("pointerup", finishOrbitDrag);
    window.addEventListener("pointercancel", finishOrbitDrag);
  };

  const onOrbitClick = (imageIndex: number) => {
    if (suppressOrbitClickRef.current) return;
    openOrbitImage(imageIndex);
  };

  return (
    <div className={`buddy-showcase ${stageActive ? "is-stage-active" : ""}`} ref={showcaseRef}>
      <div className="buddy-flight-stage" aria-label="Buddy project screenshots" ref={orbitStageRef}>
        <div className="flight-path" />
        <div className="buddy-flight-card" key={`flight-${selectedImage.src}-${changeKey}`}>
          <div className="buddy-float-inner">
            <div className="browser-top">
              <span />
              <span />
              <span />
              <p>{selectedImage.label} / platform-buddy.vercel.app</p>
            </div>
            <img
              src={selectedImage.src}
              alt={selectedIndex === 0 ? "Captured Buddy landing page" : `Selected Buddy ${selectedImage.label.toLowerCase()} screenshot`}
            />
          </div>
        </div>
        <div className="buddy-orbit" aria-label="Open Buddy screenshot preview">
          {buddyGalleryImages.map((image, imageIndex) => {
            const themedImage = getBuddyImage(image, themeMode);
            return (
              <button
                className={`buddy-orbit-card ${themedImage.tone} ${selectedIndex === imageIndex ? "is-active" : ""}`}
                key={image.label}
                onClick={() => onOrbitClick(imageIndex)}
                onPointerDown={(event) => onOrbitPointerDown(event, imageIndex)}
                onPointerUp={(event) => finishOrbitDrag(event.nativeEvent)}
                onPointerCancel={(event) => finishOrbitDrag(event.nativeEvent)}
                style={
                  {
                    "--i": imageIndex,
                    "--orbit-x": `${orbitPositions[imageIndex].x}%`,
                    "--orbit-y": `${orbitPositions[imageIndex].y}%`,
                    "--tilt": `${orbitPositions[imageIndex].tilt}deg`,
                  } as React.CSSProperties
                }
                type="button"
                aria-label={`Open Buddy ${image.label.toLowerCase()} screenshot preview`}
                aria-pressed={selectedIndex === imageIndex}
              >
                <img src={themedImage.src} alt="" loading="lazy" draggable={false} />
                <span>{image.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="buddy-strip" aria-label="Buddy screenshot gallery">
        {buddyGalleryImages.map((image, imageIndex) => {
          const themedImage = getBuddyImage(image, themeMode);
          return (
            <button
              className={`buddy-strip-item ${themedImage.tone} ${selectedIndex === imageIndex ? "is-active" : ""}`}
              key={image.label}
              onClick={() => selectImage(imageIndex)}
              style={{ "--i": imageIndex } as React.CSSProperties}
              type="button"
              aria-pressed={selectedIndex === imageIndex}
            >
              <img
                src={themedImage.src}
                alt={`Buddy ${image.label.toLowerCase()} screenshot`}
                loading={imageIndex === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <span>{image.label}</span>
            </button>
          );
        })}
      </div>
      {modalImage
        ? createPortal(
            <div className={`buddy-modal ${modalClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`Buddy ${modalImage.label} screenshot`}>
              <button className="buddy-modal-backdrop" type="button" aria-label="Close Buddy screenshot preview" onClick={closeModal} />
              <div className="buddy-modal-window">
                <div className="buddy-modal-titlebar">
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                  <p>{modalImage.label} / Buddy</p>
                  <button type="button" onClick={closeModal} aria-label="Close Buddy screenshot preview">
                    <X size={16} weight="bold" />
                  </button>
                </div>
                <button className="buddy-modal-image-button" type="button" onClick={closeModal} aria-label="Zoom out Buddy screenshot preview">
                  <img src={modalImage.src} alt={`Buddy ${modalImage.label.toLowerCase()} screenshot preview`} />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
