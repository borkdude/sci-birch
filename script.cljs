(require '[clojure.string :as str])
(require '[node.interop :as i])

(def I-branch "│   ")
(def T-branch "├── ")
(def L-branch "└── ")
(def SPACER   "    ")

(declare tree-entry)

(defn child-entries [path]
  (map #(tree-entry path %1) (i/read-dir path)))

(defn tree-entry [parent name]
  (let [path (i/path-join parent name)
        is-dir (i/directory? path)]
    {:name name
     :directory? is-dir
     :children (when is-dir (child-entries path))}))

(defn render-tree [{:keys [name children]}]
  (cons
   name
   (mapcat (fn [child index]
             (let [subtree (render-tree child)
                   last? (= index (dec (count children)))
                   prefix-first (if last? L-branch T-branch)
                   prefix-rest  (if last? SPACER I-branch)]
               (cons (str prefix-first (first subtree))
                     (map #(str prefix-rest %) (next subtree)))))
           children
           (range))))

(defn main [args]
  (let [path (or (get args 2)
                 ".")]
    (->> (tree-entry "" path)
         (render-tree)
         (str/join "\n")
         i/print)))
