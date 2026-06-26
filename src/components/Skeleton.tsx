interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return <div className={`bg-gray-700 rounded animate-pulse ${className}`} />;
};

export default Skeleton;
