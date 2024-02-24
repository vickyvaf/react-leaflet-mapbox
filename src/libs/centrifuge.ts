import { useCallback, useEffect, useRef, useState } from "react";

import Centrifuge from "centrifuge";

type Props<T> = {
  channel: string;
  dataReceived: (data: T) => void;
};

export const useConnectCentrifuge = <DataWebsocket>(
  props?: Props<DataWebsocket>
) => {
  const [statusConnection, setStatusConnection] = useState("");

  const centrifugeRef = useRef<WebSocket | any>(null);

  const centrifuge = new Centrifuge(
    "wss://wss.apps-madhani.com/connection/websocket"
  );

  const connectCentrifuge = useCallback(() => {
    centrifugeRef.current = centrifuge;

    centrifuge.on("connect", function (ctx: { client: string }) {
      setStatusConnection("websocket connect: " + ctx?.client || "");
    });

    centrifuge.on("disconnect", function (ctx: { client: string }) {
      setStatusConnection("websocket disconnect: " + ctx?.client);
      console.log("disconnected");
    });

    centrifuge.connect();

    if (!props?.channel || !props?.dataReceived) return;

    centrifuge.subscribe(
      props?.channel,
      ({ data }: { data: DataWebsocket }) => {
        return props?.dataReceived(data);
      }
    );

    return () => centrifuge.disconnect();
  }, []);

  const disconnectCentrifuge = useCallback(() => {
    const centrifuge = centrifugeRef.current;

    if (centrifuge && centrifuge.isConnected()) {
      centrifuge.disconnect();
    }
  }, []);

  useEffect(() => {
    connectCentrifuge();
  }, []);

  return {
    statusConnection,
    centrifuge,
    disconnectCentrifuge,
    connectCentrifuge,
  };
};
