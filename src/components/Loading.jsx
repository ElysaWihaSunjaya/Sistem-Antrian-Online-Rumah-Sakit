import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        className="flex space-x-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {[...Array(4)].map((_, idx) => (
          <motion.div
            key={idx}
            className="w-6 h-6 rounded-full bg-blue-500"
            variants={{
              hidden: { scale: 0, y: 30, opacity: 0 },
              visible: {
                scale: 1,
                y: [0, -24, 0],
                opacity: 1,
                transition: {
                  duration: 0.7,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: idx * 0.13
                }
              }
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="ml-6 text-xl font-bold text-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.div>
    </div>
  );
}
