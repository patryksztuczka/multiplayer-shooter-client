import { useEffect, useRef } from "react";
import { Player } from "../classes/player.class";
import { Game } from "../classes/game.class";

const Board = () => {
  const gameBoardRef = useRef<HTMLCanvasElement>(null);

  const animationRef = useRef<number | null>(null);

  const player = new Player("Player", 100, 300, 40, "green");

  const enemy1 = new Player("Enemy 1", 700, 300, 40, "purple");

  const enemy2 = new Player("Enemy 2", 700, 500, 40, "purple");

  const game = new Game([player, enemy1, enemy2]);

  const playerRef = useRef(player);

  const gameRef = useRef(game);

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

  const handleShoot = (x: number, y: number) => {
    playerRef.current.shoot();

    // cursor position
    const targetX = x - 20;
    const targetY = y - 20;

    // const dx = targetX - playerRef.current.getCenter().x;
    // const dy = targetY - playerRef.current.getCenter().y;

    // const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    game.players.forEach((player) => {
      // player bounding
      const minX = player.getPosition().x;
      const maxX = player.getPosition().x + player.getSize();
      const minY = player.getPosition().y;
      const maxY = player.getPosition().y + player.getSize();
      console.log(player.getName());
      console.log("targetX", targetX);
      console.log("targetY", targetY);
      console.log("minX", minX);
      console.log("maxX", maxX);
      console.log("minY", minY);
      console.log("maxY", maxY);
      if (targetX >= minX && targetX <= maxX && targetY >= minY && targetY <= maxY) {
        console.log("HIT");
        player.gainDamage(25);
      }
    });
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

      game.players.forEach((player) => {
        ctx.fillStyle = player.getColor();
        ctx.fillRect(
          player.getPosition().x,
          player.getPosition().y,
          player.getSize(),
          player.getSize(),
        );

        if (player.getColor() === "purple") {
          ctx.fillStyle = "red";
          ctx.fillRect(player.getPosition().x, player.getPosition().y - 20, player.getSize(), 5);

          ctx.fillStyle = "white";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";

          const healthPoints = player.getHealthPoints().toString();
          const textX = player.getPosition().x + player.getSize() / 2;
          const textY = player.getPosition().y - 25;
          ctx.fillText(healthPoints, textX, textY);
        }
      });

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
    <div className="relative">
      <canvas
        id="game-board"
        ref={gameBoardRef}
        tabIndex={1}
        height={700}
        width={1200}
        className="bg-slate-900"
        onClick={(e) => handleShoot(e.clientX, e.clientY)}
        onKeyDown={(e) => handleMovePlayer(e.key)}
        onMouseMove={(e) => handleMovePlayerCrosshair(e.clientX, e.clientY)}
      ></canvas>
      <div className="absolute bottom-10 left-10 flex h-6 w-[200px] justify-center border bg-red-500">
        100/100
      </div>
    </div>
  );
};

export default Board;
