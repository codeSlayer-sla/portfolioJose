"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import type React from "react"

type Piece = "p" | "r" | "n" | "b" | "q" | "k" | "P" | "R" | "N" | "B" | "Q" | "K" | null
type Board = Piece[][]

const initialBoard: Board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
]

const ChessGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null)
  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white")
  const [gameStatus, setGameStatus] = useState<"playing" | "check" | "checkmate" | "stalemate">("playing")
  const [promotePawn, setPromotePawn] = useState<[number, number] | null>(null)
  const [promotionChoice, setPromotionChoice] = useState<Piece | null>(null)

  const { language } = useLanguage()
  const t = translations[language].chess

  useEffect(() => {
    if (playerTurn === "black") {
      setTimeout(makeComputerMove, 1000)
    }
  }, [playerTurn])

  const isValidMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to
    const piece = board[fromRow][fromCol]
    const isWhitePiece = piece === piece?.toUpperCase()
    const targetPiece = board[toRow][toCol]
    const isTargetWhite = targetPiece === targetPiece?.toUpperCase()
    const isTargetBlack = targetPiece === targetPiece?.toLowerCase()

    // Verificar que no se pueda mover a una casilla ocupada por una pieza del mismo color
    if ((isWhitePiece && isTargetWhite) || (!isWhitePiece && isTargetBlack)) {
      return false
    }

    // Validación del movimiento, pieza por pieza
    switch (piece?.toLowerCase()) {
      case "p":
        if (isWhitePiece) {
          if (fromRow === 6) {
            if (toRow === fromRow - 1 && toCol === fromCol && board[toRow][toCol] === null) return true
            if (toRow === fromRow - 2 && toCol === fromCol && board[toRow][toCol] === null && board[toRow + 1][toCol] === null) return true
          } else if (toRow === fromRow - 1 && Math.abs(toCol - fromCol) <= 1 && board[toRow][toCol] === null) {
            return true
          } else if (toRow === fromRow - 1 && Math.abs(toCol - fromCol) === 1 && isTargetBlack) {
            return true
          }
        } else {
          if (fromRow === 1) {
            if (toRow === fromRow + 1 && toCol === fromCol && board[toRow][toCol] === null) return true
            if (toRow === fromRow + 2 && toCol === fromCol && board[toRow][toCol] === null && board[toRow - 1][toCol] === null) return true
          } else if (toRow === fromRow + 1 && Math.abs(toCol - fromCol) <= 1 && board[toRow][toCol] === null) {
            return true
          } else if (toRow === fromRow + 1 && Math.abs(toCol - fromCol) === 1 && isTargetWhite) {
            return true
          }
        }
        return false

      case "r":
        return fromRow === toRow || fromCol === toCol

      case "n":
        return (
          (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
          (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)
        )

      case "b":
        // Verificar que no haya piezas en el camino del alfil
        if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
          const rowDirection = toRow > fromRow ? 1 : -1
          const colDirection = toCol > fromCol ? 1 : -1

          let row = fromRow + rowDirection
          let col = fromCol + colDirection
          while (row !== toRow && col !== toCol) {
            if (board[row][col] !== null) {
              return false // Hay una pieza en el camino
            }
            row += rowDirection
            col += colDirection
          }
          return true
        }
        return false

      case "q":
        return fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)

      case "k":
        return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1

      default:
        return false
    }
  }

  const movePiece = (from: [number, number], to: [number, number]) => {
    const newBoard = board.map((row) => [...row])

    // Verificar si el peón llega al final para coronarse
    if (newBoard[from[0]][from[1]]?.toLowerCase() === "p" && (to[0] === 0 || to[0] === 7)) {
      setPromotePawn(to)
      return
    }

    newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]]
    newBoard[from[0]][from[1]] = null
    setBoard(newBoard)
    setPlayerTurn(playerTurn === "white" ? "black" : "white")
    checkGameStatus(newBoard)
  }

  const handleSquareClick = (row: number, col: number) => {
    if (playerTurn === "black") return

    if (selectedPiece) {
      if (isValidMove(selectedPiece, [row, col])) {
        movePiece(selectedPiece, [row, col])
        setSelectedPiece(null)
      } else {
        setSelectedPiece(null)
      }
    } else {
      const piece = board[row][col]
      if (piece && piece === piece.toUpperCase()) {
        setSelectedPiece([row, col])
      }
    }
  }

  const makeComputerMove = () => {
    const blackPieces: [number, number][] = []
    board.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece && piece === piece.toLowerCase()) {
          blackPieces.push([rowIndex, colIndex])
        }
      })
    })

    let validMove = false
    while (!validMove && blackPieces.length > 0) {
      const randomIndex = Math.floor(Math.random() * blackPieces.length)
      const [fromRow, fromCol] = blackPieces[randomIndex]

      for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {
          if (isValidMove([fromRow, fromCol], [toRow, toCol])) {
            movePiece([fromRow, fromCol], [toRow, toCol])
            validMove = true
            break
          }
        }
        if (validMove) break
      }

      if (!validMove) {
        blackPieces.splice(randomIndex, 1)
      }
    }

    if (!validMove) {
      setGameStatus("stalemate")
    }
  }

  const checkGameStatus = (newBoard: Board) => {
    const whiteKing = newBoard.some((row) => row.includes("K"))
    const blackKing = newBoard.some((row) => row.includes("k"))

    if (!whiteKing) {
      setGameStatus("checkmate")
      alert(t.blackWins)
    } else if (!blackKing) {
      setGameStatus("checkmate")
      alert(t.whiteWins)
    }
  }

  const resetGame = () => {
    setBoard(initialBoard)
    setSelectedPiece(null)
    setPlayerTurn("white")
    setGameStatus("playing")
    setPromotePawn(null)
    setPromotionChoice(null)
  }

  const handlePromotion = (piece: Piece) => {
    const [row, col] = promotePawn!
    const newBoard = board.map((row) => [...row])
    newBoard[row][col] = piece
    setBoard(newBoard)
    setPromotePawn(null)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="text-lg font-semibold">
          {t.turn}: {playerTurn === "white" ? t.white : t.black}
        </p>
        <p className="text-lg font-semibold">
          {t.status}: {t[gameStatus]}
        </p>
      </div>
      <div className="grid grid-cols-8 gap-1 bg-gray-300 p-2 rounded">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 flex items-center justify-center text-2xl cursor-pointer
                ${(rowIndex + colIndex) % 2 === 0 ? "bg-white" : "bg-gray-400"}
                ${selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex ? "bg-yellow-200" : ""}`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {piece}
            </motion.div>
          ))
        )}
      </div>

      {promotePawn && (
        <div className="mt-4 flex justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="mb-4">{t.promotePawn}</p>
            <div className="flex space-x-4">
              {["q", "r", "b", "n"].map((piece) => (
                <button
                  key={piece}
                  className="p-2 bg-blue-500 text-white rounded"
                  onClick={() => handlePromotion(piece.toUpperCase() as Piece)}
                >
                  {piece.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={resetGame}>
        {t.resetGame}
      </button>
    </div>
  )
}

export default ChessGame

