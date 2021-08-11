export default function Loader({ show }) {
  return show ? (
    <div className="flex justify-center items-center">
      <div className="animate-spin h-24 w-24 rounded-full border-green-550 border-b-2"></div>
    </div>
  ) : null;
}
