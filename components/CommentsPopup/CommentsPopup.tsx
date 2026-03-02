import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

interface ReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  modules: any;
  className?: string;
  theme?: string;
  formats?: string[];
  ref?: React.Ref<any>;
}

export const ReactQuillComponent = forwardRef<
  typeof import("react-quill-new").default,
  ReactQuillProps
>((props, ref) => {
  const [Component, setComponent] =
    useState<React.ComponentType<ReactQuillProps> | null>(null);

  useEffect(() => {
    let alive = true;
    import("react-quill-new").then((module) => {
      if (!alive) return;
      setComponent(
        () =>
          module.default as unknown as React.ComponentType<ReactQuillProps>,
      );
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!Component)
    return <p className="text-sm text-gray-600">Loading editor...</p>;
  return <Component ref={ref} {...props} />;
});

const ReactQuill = dynamic(
  () => Promise.resolve(ReactQuillComponent),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-gray-600">Loading editor...</p>
    ),
  },
) as React.ForwardRefExoticComponent<
  ReactQuillProps &
    React.RefAttributes<typeof import("react-quill-new").default>
>;

const toolbarOptions = {
  container: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
  ],
};

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // prevent layout shift when scrollbar disappears
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

interface CommentsPopupProps {
  comment: string;
  onClose: () => void;
  onSave: (updatedComment: string) => void;
  title?: string;
  saveLabel?: string;
}

export const CommentsPopup: React.FC<CommentsPopupProps> = ({
  comment,
  onClose,
  onSave,
  title = "Edit comment",
  saveLabel = "Save",
}) => {
  const [updatedComment, setUpdatedComment] =
    useState<string>(comment);
  const [isMounted, setIsMounted] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  useLockBodyScroll(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setUpdatedComment(comment);
  }, [comment]);

  useEffect(() => {
    if (!isMounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    // focus first control
    setTimeout(() => firstFocusRef.current?.focus(), 0);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMounted, onClose]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    // close only if clicking backdrop, not dialog content
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = updatedComment.trim();
    onSave(trimmed);
    onClose();
  };

  const editorModules = useMemo(
    () => ({
      toolbar: toolbarOptions,
    }),
    [],
  );

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-6"
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        className="
          w-full
          sm:max-w-3xl
          bg-white
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          overflow-hidden
          max-h-[92dvh]
          sm:max-h-[85vh]
          flex flex-col
        "
      >
        {/* Header (sticky) */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="sm:hidden h-1.5 w-10 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2 -top-2" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                {title}
              </h2>
            </div>

            <button
              ref={firstFocusRef}
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          {/* Mobile hint row */}
          <div className="sm:hidden px-4 pb-3 text-xs text-gray-500">
            Swipe/scroll inside editor • Tap outside to close
          </div>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col"
        >
          <div className="px-4 sm:px-6 py-4 flex-1 overflow-auto">
            <div
              className="
                rounded-xl border border-gray-200 overflow-hidden
                bg-white
              "
            >
              {/* Quill container styling helper */}
              <ReactQuill
                value={updatedComment}
                onChange={setUpdatedComment}
                modules={editorModules}
                theme="snow"
                className="
                  text-sm
                  [&_.ql-toolbar]:sticky
                  [&_.ql-toolbar]:top-0
                  [&_.ql-toolbar]:z-10
                  [&_.ql-toolbar]:bg-white
                  [&_.ql-toolbar]:border-b
                  [&_.ql-container]:min-h-[45dvh]
                  sm:[&_.ql-container]:min-h-[320px]
                "
              />
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Tip: keep it short and clear. Formatting is supported.
            </div>
          </div>

          {/* Footer (sticky) */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200">
            <div className="px-4 sm:px-6 py-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {saveLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
