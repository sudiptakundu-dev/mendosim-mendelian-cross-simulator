import Icon from "./Icon"

function Logo() {
  return (
    <div className="inline-flex items-center justify-center gap-2">
        <Icon></Icon>
        <div className="flex flex-col">
            <span className="text-xl font-bold text-(--text-primary)">MendoSim</span>
            <span className="text-(--text-muted)">Mendelian Cross Simulator</span>
        </div>
    </div>
  )
}

export default Logo