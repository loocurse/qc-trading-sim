function Buttons({cash}) {
    return (
        <div className="buttons">
            <p>Money: ${cash}</p>
            <button>Buy</button>
            <button>Sell</button>
        </div>
    )
}

export default Buttons
