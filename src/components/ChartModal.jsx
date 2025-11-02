import { Dialog } from "@base-ui-components/react/dialog";

const ChartModal = ({ isOpen, onOpenChange, selectedCoin, isSpot }) => {
  const symbol = selectedCoin
    ? isSpot
      ? `BINANCE:${selectedCoin.toUpperCase()}USDT`
      : `BINANCE:${selectedCoin.toUpperCase()}USDT.P`
    : "";

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal className="">
        <Dialog.Backdrop className="
          fixed inset-0 bg-black/80 backdrop-blur-sm
          data-[state=open]:animate-fade-in 
          data-[state=closed]:animate-fade-out
        " />

        <Dialog.Popup
          className="
            fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90vw] max-w-[1200px]
            rounded-lg border border-neutral-700
            text-white1 
          "
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <Dialog.Title className="text-[20px] font-medium">
              {selectedCoin ? `${selectedCoin} Chart` : "Chart"}
            </Dialog.Title>
            <Dialog.Close
              className="
                p-2 rounded-md
              "
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </Dialog.Close>
          </div>
          <div className="px-6 py-4">
            {selectedCoin ? (
              <iframe
                className="h-[400px] md:h-[500px] w-full"
                src={`https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=1&hidesidetoolbar=1&theme=dark&timezone=Etc%2FLocal`}
                allowFullScreen
                title={`${selectedCoin} Chart`}
              />
            ) : (
              <div className="p-6 text-center text-neutral-400">
                No asset selected
              </div>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChartModal;