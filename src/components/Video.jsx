import React from 'react';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { socket } from '../sockets/connection';
import "./Video.css";
import SimplePeer from 'simple-peer';
import LoadingDots from './LoadingDots';
import { IoIosVideocam } from "react-icons/io";
import { ImPhoneHangUp } from "react-icons/im";


const Video = ({gameState}) => {

    const [stream, setStream] = useState();
    const [callStarted, setCallStarted] = useState(false);
    const [peerConnected, setPeerConnected] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState();
    const [peerSignal, setPeerSignal] = useState();
    const [videoWidth, setVideoWidth] = useState();

    const videoRef = useRef();
    const peerRef = useRef();
    const location = useLocation();

    const [style, setStyle] = useState({
        position: "relative",
        height: "auto",
        right: "0px"

    })

    const { gameId } = useParams();

    useEffect(() => {
        const handleResize = () => {
          // Access the current video element
          const videoElement = peerRef.current;
    
          // Check if the video element is available
          if (videoElement) {
            // Get the current width of the video
            const currentWidth = videoElement.clientWidth;
    
            // Compare with the previous width to see if it has changed
            if (currentWidth !== videoWidth) {
              // Trigger your desired effect or function when the width changes
              console.log('Video width changed:', currentWidth);
    
              // Update the state with the new width
              setVideoWidth(currentWidth);
            }
          }
        };
    
        // Attach the resize event listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [videoWidth]);

    useEffect(() => {
        console.log("EFFECT RAN", videoRef, peerRef)
        const handleMediaDevices = async () => {
            try {
                const stream1 = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(stream1);
                console.log("TRY BLOCK", videoRef)
                if (videoRef.current) {
                    videoRef.current.srcObject = stream1;
                }
                console.log("SHOULDBESET", videoRef)
            } catch (error) {
                console.error('Error media devices.', error);
            }
        };
    
        const handleReceivingCall = (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setPeerSignal(data.signal);
        };
    
        const handleEndCall = () => {
            // if (peer) {
            //     peer.destroy();
            // }
    
            setCallStarted(false);
            setPeerConnected(false);
            setCaller(null);
            setPeerSignal(null);
            setStyle({
                position: "relative",
                height: "auto",
                right: "0px"
            });
        };

        
    
        handleMediaDevices();
    
        socket.on("receivingCall", handleReceivingCall);
    
        socket.on("endCall", handleEndCall);
    
        return () => {
            // Cleanup code (remove event listeners, etc.)
            // if (peer) {
            //     peer.destroy();
            // }
        };
    }, []);

    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
    //         setStream(stream)
    //         console.log("Effect")
    //         if (videoRef.current) {
    //             console.log("Set video ref srcObject")
    //             videoRef.current.srcObject = stream;
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error media devices.', error);
    //     });

    //     socket.on("receivingCall", data => {
    //         setReceivingCall(true);
    //         setCaller(data.from);
    //         setPeerSignal(data.signal);
    //     })

    //     socket.on("endCall", () => {
    //         if (peer) {
    //             peer.destroy()
    //         }
    //         setCallStarted(false)
    //         setPeerConnected(false)
    //         setCaller(null)
    //         setPeerSignal(null)
    //         setPeer(null)
    //         setStyle({
    //             position: "relative",
    //             height: "auto",
    //             right: "0px"
        
    //         })
    //     })

    //     return () => {
    //         // Cleanup code (remove event listeners, etc.)
    //         if (peer) {
    //             peer.destroy()
    //         }
    //       };
    // }, [])

    const startCall = () => {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
      
        peer.on("signal", data => {
            socket.emit("call", { id: gameId, signal: data, from: gameState.activePlayer})
        })
      
        peer.on("stream", stream => {

            if (peerRef.current) {
              peerRef.current.srcObject = stream;
            }

        });

        peer.on("error", err => {
            console.log(err)
        })

        socket.on("callAccepted", signal => {
            setStyle({
                position: "absolute",
                height: "30%",
                right: "0px"
            })
            setPeerConnected(true);
            peer.signal(signal);
        })
        setCallStarted(true)
    }

    const endCall = () => {
        setCallStarted(false)
        setPeerConnected(false)
        setStyle({
            position: "relative",
            height: "auto",
            right: "0px"
    
        })
        socket.emit("endCall", gameId)
        // if (peer) {
        //     peer.destroy()
        // }
        
    }

    const acceptCall = () => {
        setPeerConnected(true);
        setCallStarted(true);
        setReceivingCall(false);

        setStyle({
            position: "absolute",
            height: "30%",
            right: "0px"
        })

        console.log("Stream", stream)

        const newPeer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream,
        });


        newPeer.on("signal", data => {
            socket.emit("acceptCall", { signal: data, id: gameId })
        })

        newPeer.on("stream", stream => {
            console.log("Set peerRef srcObject from accept call", peerRef, videoRef)
            if (peerRef.current) {
                peerRef.current.srcObject = stream;
            }
        });

        newPeer.on('error', (err) => {
            console.error('SimplePeer error:', err);
        });

        newPeer.signal(peerSignal);
    }

    // Four cases
    // Peer connected -> main view with picture in picture
    // Calling partner -> view saying calling partner -> if callStarted
    // Receving call -> view saying partner calling -> if receivingCall
    // Nothing -> Button with option to call user

    let peerVideo;
    peerVideo = (
        <video className="opp-video" ref={peerRef} style={{height: peerConnected ? "100%" : "0px"}} autoPlay playsInline controls={false}/>
    )
    

    let button;

    let mainVideo;
    if (peerConnected) {
            button = (
                <div style={{position: "absolute", zIndex: 5, display: 'flex', bottom: 10, right: videoWidth / 2 - 10, alignSelf: "center"}}>
                    <button className='hangup' onClick={endCall}><ImPhoneHangUp size="1.5em" color="white"/></button>
                </div>
            )

    } else if (callStarted) {
        mainVideo = (
            <div className='flex-row' style={{width: "100%", alignItems: "baseline", alignSelf: "flex-end"}}>
                <h3>Now calling opponent</h3>
                <LoadingDots/>
            </div>
        )

        button = (
            <div style={{position: "absolute", alignSelf: "center", bottom: "10px", zIndex: 5}}>
                <button className='hangup' onClick={endCall}><ImPhoneHangUp size="1.5em" color="white"/></button>
            </div>
        )

    } else if (receivingCall) {
        mainVideo = (
            <div className="flex-row" style={{width: "100%", alignItems: "baseline", alignSelf: "flex-end"}}>
                <h3>Receiving a call from {caller}</h3>
                <LoadingDots />
            </div>
        )

        button = (
            <div className="accept-container" style={{display: 'flex', position: "absolute", zIndex: 5, bottom: 10, alignSelf: 'center'}}>
                <button className="accept-button" onClick={acceptCall}><IoIosVideocam size="1.5em" color="white"/></button>
                <button className="hangup"><ImPhoneHangUp size="1.5em" color="white"/></button>        
            </div>     
        )
    } else {
        mainVideo = (
            <div className="flex-row" style={{width: "100%"}}>
                <p>Start a video call with your opponent:</p>
                {stream && <button className="start-button" onClick={startCall}>Start Call</button>}
            </div>
        )

    }



    
    return (
        <div className='video-container flex-col'>
            <p style={{alignSelf: "flex-end", marginRight: "20px"}}>Opponents: {location.state.users.map(user => user.user)} {gameState.activePlayer}</p>
            
            <div className="flex-col" style={{position: "relative", height: "100%"}}>
                {mainVideo}
                {peerVideo}
                <div className='flex-col' style={{position: style.position, flex: 1, height: style.height, alignSelf: peerConnected ? 'flex-end' : 'center', marginRight: "10px"}}>
                    <video className="user-video" style={{zIndex: 3, top: peerConnected ? "5px" : "", right: peerConnected ? "5px" : "", visibility: callStarted || receivingCall ? "visible" : "hidden"}} ref={videoRef} muted autoPlay playsInline controls={false}/>
                </div>
            </div>
            {button}
            
        </div>
    );
};

export default Video;