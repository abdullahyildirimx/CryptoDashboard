import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

const ChartModal = ({ isOpen, onOpenChange, selectedCoin, isSpot}) => {
  const symbol = selectedCoin && isSpot
    ? `BINANCE:${selectedCoin?.toUpperCase()}USDT`
    : `BINANCE:${selectedCoin?.toUpperCase()}USDT.P`;
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="center"
      size="4xl"
      classNames={{
        wrapper: "p-4", 
        base: "bg-black1 text-white1 !m-0",
        closeButton: "text-white1 hover:bg-transparent active:bg-transparent p-4",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-white1">
              {selectedCoin ? `${selectedCoin} Chart` : "Chart"}
            </ModalHeader>

            <ModalBody>
              {selectedCoin && (
                <iframe
                  className="h-[400px] md:h-[500px]"
                  src={`https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=1&hidesidetoolbar=1&theme=dark`}
                  width="100%"
                  allowFullScreen
                  title={`${selectedCoin} Chart`}
                />
              )}
            </ModalBody>

            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChartModal;