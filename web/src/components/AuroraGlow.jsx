export default function AuroraGlow({ className = '', style = {} }) {
  return (
    <div
      className={`aurora-glow ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
