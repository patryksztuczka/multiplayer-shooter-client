import { useEffect, useRef } from "react";
import { Player } from "../classes/player.class";

const Board = () => {
  const gameBoardRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const playerRef = useRef(new Player(0, 0, 40));

  const handleMovePlayer = (key: string) => {
    playerRef.current.move(key);
  };

  const handleMovePlayerCrosshair = (currentX: number, currentY: number) => {
    const player = playerRef.current;
    playerRef.current.moveCrosshair(
      currentX - player.getSize() / 2,
      currentY - player.getSize() / 2,
    );
  };

  const animate = () => {
    const ctx = gameBoardRef.current?.getContext("2d");
    const player = playerRef.current;

    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.arc(player.getCenter().x, player.getCenter().y, player.getWeaponRange(), 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "green";
      ctx.fillRect(
        player.getPosition().x,
        player.getPosition().y,
        player.getSize(),
        player.getSize(),
      );

      ctx.beginPath();
      ctx.moveTo(player.getCenter().x, player.getCenter().y);
      ctx.lineTo(player.getCrosshair().x, player.getCrosshair().y);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const ctx = gameBoardRef.current?.getContext("2d");

    if (ctx) {
      ctx.canvas.width = window.innerWidth - 40;
      ctx.canvas.height = window.innerHeight - 40;

      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      id="game-board"
      ref={gameBoardRef}
      tabIndex={1}
      height={700}
      width={1200}
      className="bg-slate-900"
      onKeyDown={(e) => handleMovePlayer(e.key)}
      onMouseMove={(e) => handleMovePlayerCrosshair(e.clientX, e.clientY)}
    ></canvas>
  );
};

export default Board;
