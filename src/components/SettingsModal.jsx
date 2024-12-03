import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMarketBuySellStorage, setMarketBuySellStorage } from '../utils/localStorageUtils';
import { setApiEnabled, setApiKey, setApiSecret } from "../utils/reduxStorage";

const SettingsModal = () => {
  const dispatch = useDispatch();
  const localStorageData = getMarketBuySellStorage();
  const [binanceApiKey, setBinanceApiKey] = useState(localStorageData?.binanceApiKey || "");
  const [binanceApiSecret, setBinanceApiSecret] = useState(localStorageData?.binanceApiSecret || "");

  const saveSettings = () => {
    const key = binanceApiKey.trim();
    const secret = binanceApiSecret.trim();
    const enabled = (key && secret) ? true : false;
    setMarketBuySellStorage("apiEnabled", enabled);
    setMarketBuySellStorage('binanceApiKey', key);
    setMarketBuySellStorage("binanceApiSecret", secret);
    dispatch(setApiEnabled(enabled));
    dispatch(setApiKey(key));
    dispatch(setApiSecret(secret));
  };

  return (
    <div className="d-flex align-items-center">
			<div>
				<button className="icon-button" data-bs-toggle="modal" data-bs-target="#settingsModal">
					<i className="fa-solid fa-gear text-white" style={{ fontSize: "30px" }}></i>
				</button>
			</div>

      <div className="modal fade text-white" id="settingsModal" tabIndex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsModalLabel">
								Binance API Settings
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="apiKey" className="form-label">
                    API Key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apiKey"
                    value={binanceApiKey}
                    onChange={(e) => setBinanceApiKey(e.target.value)}
                    placeholder="Enter your Binance API key"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apiSecret" className="form-label">
                    API Secret
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="apiSecret"
                    value={binanceApiSecret}
                    onChange={(e) => setBinanceApiSecret(e.target.value)}
                    placeholder="Enter your Binance API Secret"
                    autoComplete="off"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={saveSettings}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;