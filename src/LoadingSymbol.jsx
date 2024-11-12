function degToRad(deg) {
    return (deg / 180) * Math.PI
}

const angle = degToRad(45)
const y = 0.5 - Math.tan(Math.PI / 2 - angle) / 2
console.log(y * 100)
const width = 100 / Math.cos(angle / 2)

function LoadingSymbol() {
    return (
        <div className="loading-symbol">
            <div className="circle">
                <div
                    className="circle-segment"
                    style={{
                        clipPath: `polygon(50% 0, 50% 50%, 100% ${
                            y * 100
                        }%, 50% 0)`,
                        width: `${width}%`,
                    }}
                ></div>
                <div className="center-cover"></div>
            </div>
        </div>
    )
}

export default LoadingSymbol
