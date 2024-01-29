import { DeviceManager } from "@azure/communication-calling";
import { CallAgent } from "@azure/communication-calling";
import { DevicesSettings } from "../entities/deviceSettings";
export declare class CallService {
    private _callAgent;
    private _deviceManager;
    private _localSource;
    private _isSelfVideoEnabled;
    private _selfRenderer;
    private _selfVideoId;
    constructor(callAgent: CallAgent, deviceManager: DeviceManager);
    initCallSettings(context: any, deviceSettings: DevicesSettings, selfVideoId: string): Promise<{
        video: boolean;
    }>;
    changeCamera(): Promise<string>;
    updateDevices(devices: DevicesSettings): Promise<void>;
    toggleVideo(): Promise<string | undefined>;
    toggleMute(mute: boolean): Promise<void>;
    stopCall(): void;
    onStopCall(): void;
    toggleScreenSharing(enable: boolean): Promise<void>;
    private getCallOptions;
    private selfPreview;
    private setSelectedMicrophone;
    private setSelectedSpeaker;
    private getCameraSource;
    private disposeSelfRenderer;
}
