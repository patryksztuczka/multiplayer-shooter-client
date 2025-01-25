import { Player } from "./player.class";

export class Game {
  players: Player[];

  constructor(players: Player[] = []) {
    this.players = players;
  }
}
