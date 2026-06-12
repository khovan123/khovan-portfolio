import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowSquareOut,
  BracketsCurly,
  Check,
  CheckCircle,
  CircleNotch,
  Cloud,
  Code,
  Copy,
  Database,
  DownloadSimple,
  EnvelopeSimple,
  GitBranch,
  GithubLogo,
  Moon,
  PaperPlaneTilt,
  Sparkle,
  Sun,
  TerminalWindow,
  UploadSimple,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import * as THREE from "three";
import BuddyShowcase, { type ThemeMode } from "./BuddyShowcase";
import "./styles.css";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Python",
  "Java",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "Qdrant",
  "Docker",
  "Azure",
  "Vercel",
  "Fly.io",
];

const projects = [
  {
    name: "Buddy",
    eyebrow: "Production-grade learning platform",
    repo: "https://github.com/khovan123/buddy",
    live: "https://platform-buddy.vercel.app/",
    summary:
      "A full-stack learning marketplace where creators publish video tutorials and resources, students buy or enroll, and an AI assistant answers from actual course material.",
    proof:
      "Built beyond CRUD with 11 deployable services, event-driven messaging, HLS media processing, payments, recommendations, RAG search, observability, and cloud deployment workflows.",
    details: [
      "API gateway with bulkheads, circuit breakers, retries, and partial-failure composition.",
      "RAG service with Qdrant retrieval, Gemini generation, Redis cache, source citations, and streaming UI.",
      "Recommendation service using TensorFlow/Keras, FAISS indexing, drift checks, and model lifecycle triggers.",
      "Media pipeline for FFmpeg HLS streams, trailer extraction, S3 presigned access, and Cloudinary previews.",
    ],
    stack: ["Next.js 16", "React 19", "NestJS", "FastAPI", "TensorFlow", "Qdrant", "PostgreSQL", "MongoDB"],
  },
  {
    name: "ContextOS",
    eyebrow: "Developer context engine",
    repo: "https://github.com/khovan123/contextOS",
    live: "https://github.com/khovan123/contextOS/blob/main/docs/demo/contextos-demo.gif",
    summary:
      "A CLI and Codex plugin that fixes buried AGENTS.md instructions by ranking project rules against the current prompt and injecting the right context before work starts.",
    proof:
      "Turns static repo rules into task-aware runtime context with file, skill, workflow suggestions and compliance reports after the task.",
    details: [
      "Prompt scoring with local MiniLM embeddings plus heuristics for AGENTS.md rules.",
      "Codex, Claude Code, and Antigravity hooks for before-task injection and after-task evidence reports.",
      "MCP bridge, file-path retrieval, workflow sync, skill sync, and Ruler integration.",
      "Published npm package with scriptable setup, install variants, and local telemetry artifacts.",
    ],
    stack: ["Node.js", "TypeScript", "MCP", "Codex hooks", "MiniLM", "npm package"],
  },
];

const metrics = [
  ["11", "deployable services in Buddy"],
  ["4", "storage/search engines across flagship systems"],
  ["3", "agent runtimes supported by ContextOS"],
  ["2026", "recent public project cycle"],
];

const npmDownloadSeries = [
  { day: "04/30", downloads: 0 },
  { day: "05/01", downloads: 0 },
  { day: "05/02", downloads: 0 },
  { day: "05/03", downloads: 0 },
  { day: "05/04", downloads: 0 },
  { day: "05/05", downloads: 0 },
  { day: "05/06", downloads: 0 },
  { day: "05/07", downloads: 0 },
  { day: "05/08", downloads: 0 },
  { day: "05/09", downloads: 0 },
  { day: "05/10", downloads: 0 },
  { day: "05/11", downloads: 0 },
  { day: "05/12", downloads: 0 },
  { day: "05/13", downloads: 0 },
  { day: "05/14", downloads: 0 },
  { day: "05/15", downloads: 0 },
  { day: "05/16", downloads: 0 },
  { day: "05/17", downloads: 0 },
  { day: "05/18", downloads: 0 },
  { day: "05/19", downloads: 0 },
  { day: "05/20", downloads: 0 },
  { day: "05/21", downloads: 0 },
  { day: "05/22", downloads: 0 },
  { day: "05/23", downloads: 0 },
  { day: "05/24", downloads: 0 },
  { day: "05/25", downloads: 235 },
  { day: "05/26", downloads: 507 },
  { day: "05/27", downloads: 155 },
  { day: "05/28", downloads: 2156 },
  { day: "05/29", downloads: 1216 },
];

type HeadingTag = "h1" | "h2" | "h3";

const techLogos: Record<string, { src?: string; label: string; badge?: string }> = {
  "TypeScript": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", label: "TypeScript logo" },
  "React": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", label: "React logo" },
  "Next.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", label: "Next.js logo" },
  "NestJS": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", label: "NestJS logo" },
  "Python": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", label: "Python logo" },
  "Java": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", label: "Java logo" },
  "PostgreSQL": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", label: "PostgreSQL logo" },
  "MongoDB": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", label: "MongoDB logo" },
  "Redis": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", label: "Redis logo" },
  "RabbitMQ": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg", label: "RabbitMQ logo" },
  "Qdrant": { src: "https://cdn.simpleicons.org/qdrant/DC244C", label: "Qdrant logo" },
  "Docker": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", label: "Docker logo" },
  "Azure": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", label: "Azure logo" },
  "Vercel": { src: "https://cdn.simpleicons.org/vercel/000000", label: "Vercel logo" },
  "Fly.io": { src: "https://cdn.simpleicons.org/flydotio/8B5CF6", label: "Fly.io logo" },
  "Next.js 16": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", label: "Next.js logo" },
  "React 19": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", label: "React logo" },
  "FastAPI": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", label: "FastAPI logo" },
  "TensorFlow": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", label: "TensorFlow logo" },
  "Node.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", label: "Node.js logo" },
  "MCP": { label: "Model Context Protocol", badge: "MCP" },
  "Codex hooks": { label: "Codex hooks", badge: "CX" },
  "MiniLM": { label: "MiniLM", badge: "ML" },
  "npm package": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg", label: "npm logo" },
};

function useScrollReveal() {
  React.useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .stagger-child"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function AnimatedText({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: HeadingTag;
  children: string;
  className?: string;
}) {
  return (
    <Tag className={`text-cascade reveal ${className}`}>
      {children.split(" ").map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <span className="word" style={{ "--i": index } as React.CSSProperties}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function SystemsScene() {
  const mountRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.1, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const accent = new THREE.Color("#d0603d");
    const neutral = new THREE.Color("#d8d2c5");
    const dark = new THREE.Color("#25231f");

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 2),
      new THREE.MeshStandardMaterial({
        color: neutral,
        metalness: 0.22,
        roughness: 0.34,
        wireframe: false,
      }),
    );
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.28 }),
    );
    group.add(wire);

    const orbitMaterial = new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 0.36,
      roughness: 0.42,
    });
    const satelliteGeometry = new THREE.SphereGeometry(0.11, 24, 24);
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 34; i += 1) {
      const mesh = new THREE.Mesh(satelliteGeometry, orbitMaterial);
      const angle = (i / 34) * Math.PI * 2;
      const radius = 2.1 + (i % 5) * 0.22;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(i * 1.7) * 0.7, Math.sin(angle) * radius);
      satellites.push(mesh);
      group.add(mesh);
    }

    const curveMaterial = new THREE.LineBasicMaterial({ color: "#716b60", transparent: true, opacity: 0.34 });
    for (let ring = 0; ring < 3; ring += 1) {
      const curve = new THREE.EllipseCurve(0, 0, 2.4 + ring * 0.34, 1.0 + ring * 0.2, 0, Math.PI * 2);
      const points = curve.getPoints(128).map((point) => new THREE.Vector3(point.x, 0, point.y));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineLoop(geometry, curveMaterial);
      line.rotation.x = Math.PI / 2 + ring * 0.32;
      line.rotation.z = ring * 0.72;
      group.add(line);
    }

    scene.add(new THREE.AmbientLight("#f0eadf", 1.25));
    const key = new THREE.DirectionalLight("#ffe1c4", 2.4);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight("#d0603d", 18, 15);
    rim.position.set(-4, -1, 3);
    scene.add(rim);

    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      const delta = clock.getDelta();
      core.rotation.x += delta * 0.2;
      core.rotation.y += delta * 0.34;
      wire.rotation.y -= delta * 0.18;
      group.rotation.y = pointer.x * 0.16 + Math.sin(t * 0.18) * 0.24;
      group.rotation.x = -pointer.y * 0.12 + Math.sin(t * 0.24) * 0.08;

      satellites.forEach((mesh, index) => {
        const angle = t * (0.2 + (index % 4) * 0.025) + index * 0.38;
        const radius = 2.25 + (index % 5) * 0.2;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = Math.sin(angle * 1.7 + index) * 0.86;
      });

      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      core.geometry.dispose();
      wire.geometry.dispose();
      satelliteGeometry.dispose();
      orbitMaterial.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="systems-scene" ref={mountRef} aria-label="Animated 3D system orbit" />;
}

function LinkButton({
  href,
  children,
  download,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean | string;
  variant?: "primary" | "ghost";
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const directAsset = href.startsWith("/") && !href.startsWith("/#");
  const shouldOpenNewTab = !download && (external || directAsset);

  return (
    <a
      className={`button ${variant}`}
      download={download}
      href={href}
      target={shouldOpenNewTab ? "_blank" : undefined}
      rel={shouldOpenNewTab ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function TechTag({ item, index, compact = false }: { item: string; index?: number; compact?: boolean }) {
  const logo = techLogos[item];

  return (
    <span
      className={`tech-tag ${compact ? "compact" : "stagger-child"}`}
      style={index === undefined ? undefined : ({ "--i": index } as React.CSSProperties)}
    >
      {logo?.src ? (
        <img className="tech-logo" src={logo.src} alt="" aria-hidden="true" loading="lazy" draggable={false} />
      ) : (
        <span className="tech-logo-badge" aria-hidden="true">
          {logo?.badge ?? item.slice(0, 2).toUpperCase()}
        </span>
      )}
      {item}
    </span>
  );
}

function CustomCursor() {
  const cursorRef = React.useRef<HTMLDivElement | null>(null);
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const setVariant = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest("a, button, .buddy-orbit-card, .buddy-strip-item, .resume-preview");
      const nextLabel = interactive?.classList.contains("buddy-orbit-card")
        ? "drag"
        : interactive?.classList.contains("buddy-strip-item")
          ? "pick"
          : interactive
            ? "open"
            : "";

      document.body.classList.toggle("cursor-hovering", Boolean(interactive));
      setLabel(nextLabel);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursorRef.current?.style.setProperty("--cursor-x", `${currentX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${currentY}px`);
      dotRef.current?.style.setProperty("--cursor-x", `${targetX}px`);
      dotRef.current?.style.setProperty("--cursor-y", `${targetY}px`);
      frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setVariant(event.target);
      document.body.classList.add("cursor-ready");
    };

    const onPointerLeave = () => {
      document.body.classList.remove("cursor-ready", "cursor-hovering");
      setLabel("");
    };

    setEnabled(true);
    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.body.classList.remove("cursor-ready", "cursor-hovering");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="site-cursor" ref={cursorRef} aria-hidden="true">
        <span>{label}</span>
      </div>
      <div className="site-cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}

function NpmDownloadGraph() {
  const [copied, setCopied] = React.useState(false);
  const maxDownloads = Math.max(...npmDownloadSeries.map((item) => item.downloads));
  const total = npmDownloadSeries.reduce((sum, item) => sum + item.downloads, 0);
  const activeDays = npmDownloadSeries.filter((item) => item.downloads > 0).length;
  const peak = npmDownloadSeries.reduce((best, item) => (item.downloads > best.downloads ? item : best), npmDownloadSeries[0]);
  const installCommand = "npm install -g @minhpnq1807/contextos\nctx setup";
  const points = npmDownloadSeries
    .map((item, index) => {
      const x = (index / (npmDownloadSeries.length - 1)) * 100;
      const y = 86 - (item.downloads / maxDownloads) * 68;
      return `${x},${y}`;
    })
    .join(" ");

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = installCommand;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="npm-card reveal">
      <div className="npm-card-top">
        <div>
          <span className="section-kicker">npm package</span>
          <h3>@minhpnq1807/contextos</h3>
          <p>Public CLI package for task-aware AGENTS.md context injection.</p>
        </div>
        <a href="https://www.npmjs.com/package/@minhpnq1807/contextos" target="_blank" rel="noreferrer">
          npm
        </a>
      </div>
      <div className="npm-stats">
        <div>
          <strong>4,269</strong>
          <span>Weekly downloads</span>
        </div>
        <div>
          <strong>0.5.44</strong>
          <span>Latest version</span>
        </div>
        <div>
          <strong>{activeDays}</strong>
          <span>Active days</span>
        </div>
      </div>
      <div className="download-graph" aria-label={`Npm downloads graph, ${total} downloads in the last month`}>
        <svg viewBox="0 0 100 92" preserveAspectRatio="none" role="img">
          <polyline points={points} />
        </svg>
        <div className="bars">
          {npmDownloadSeries.map((item) => (
            <span
              key={item.day}
              title={`${item.day}: ${item.downloads.toLocaleString()} downloads`}
              style={{ "--height": `${Math.max(3, (item.downloads / maxDownloads) * 100)}%` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className="npm-foot">
        <span>Last month: {total.toLocaleString()} downloads</span>
        <span>
          Peak: {peak.downloads.toLocaleString()} on {peak.day}
        </span>
      </div>
      <div className="npm-install">
        <div className="npm-install-top">
          <span>Install ContextOS</span>
          <button type="button" onClick={copyInstallCommand} aria-label="Copy ContextOS install command">
            {copied ? <Check size={15} weight="bold" /> : <Copy size={15} weight="duotone" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <code>npm install -g @minhpnq1807/contextos</code>
        <code>ctx setup</code>
      </div>
    </div>
  );
}

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = React.useState("");

  React.useEffect(() => {
    if (status !== "success") return;

    const timer = window.setTimeout(() => {
      setStatus("idle");
      setNotice("");
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [status]);

  const closeDialog = () => {
    onClose();
    if (status !== "sending" && status !== "success") {
      setStatus("idle");
      setNotice("");
    }
  };

  const readAttachment = React.useCallback(async () => {
    if (!file) return null;
    if (file.size > 4 * 1024 * 1024) {
      throw new Error("Attachment must be 4MB or smaller.");
    }

    return new Promise<{ content: string; name: string; type: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read attachment."));
      reader.onload = () => {
        const result = String(reader.result || "");
        resolve({
          content: result.split(",")[1] || "",
          name: file.name,
          type: file.type || "application/octet-stream",
        });
      };
      reader.readAsDataURL(file);
    });
  }, [file]);

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setNotice("");

    try {
      const attachment = await readAttachment();
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          attachment,
          customerEmail,
          message,
          name,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Could not send your message.");
      }

      setStatus("success");
      setNotice("Sent successfully. I will reply from my inbox.");
      setName("");
      setCustomerEmail("");
      setMessage("");
      setFile(null);
      onClose();
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Could not send your message.");
    }
  };

  return (
    <>
      <div className={`contact-dialog-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="contact-dialog-backdrop" type="button" aria-label="Close contact dialog" onClick={closeDialog} />
        <form className="contact-dialog" onSubmit={submitContact}>
        <div className="contact-dialog-top">
          <div>
            <span className="section-kicker">Contact Minh</span>
            <h3>Send a project note</h3>
          </div>
          <button className="dialog-icon-button" type="button" onClick={closeDialog} aria-label="Close contact dialog">
            <X size={16} weight="bold" />
          </button>
        </div>

        <label>
          <span>Your name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} name="name" autoComplete="name" />
        </label>
        <label>
          <span>Your email</span>
          <input
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            required
            maxLength={160}
            name="email"
            type="email"
            autoComplete="email"
          />
        </label>
        <label>
          <span>What do you want from me?</span>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={1800} name="message" rows={5} />
        </label>

        <label className="attachment-drop">
          <UploadSimple size={18} weight="duotone" />
          <span>{file ? file.name : "Add a helpful file if you have one"}</span>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            aria-label="Attach optional file"
          />
        </label>

        {notice && status === "error" ? (
          <div className={`contact-notice ${status}`}>
            <WarningCircle size={17} weight="duotone" />
            <span>{notice}</span>
          </div>
        ) : null}

        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? <CircleNotch className="loading-icon" size={18} weight="bold" /> : <PaperPlaneTilt size={18} weight="duotone" />}
          {status === "sending" ? "Sending" : "Send"}
        </button>
        </form>
      </div>
      {status === "success" ? (
        <div className="contact-toast success" role="status">
          <CheckCircle size={18} weight="duotone" />
          <span>{notice}</span>
        </div>
      ) : null}
    </>
  );
}

function ProjectPanel({ project, index, themeMode }: { project: (typeof projects)[number]; index: number; themeMode: ThemeMode }) {
  return (
    <article className={`project-panel reveal ${index === 1 ? "reverse" : ""}`}>
      <div className="project-copy">
        <span className="section-kicker reveal">{project.eyebrow}</span>
        <AnimatedText as="h3">{project.name}</AnimatedText>
        <p className="copy-reveal reveal">{project.summary}</p>
        <p className="proof copy-reveal reveal">{project.proof}</p>
        <ul>
          {project.details.map((detail, detailIndex) => (
            <li className="stagger-child" style={{ "--i": detailIndex } as React.CSSProperties} key={detail}>
              {detail}
            </li>
          ))}
        </ul>
        <div className="tag-row">
          {project.stack.map((item, stackIndex) => (
            <TechTag item={item} index={stackIndex} key={item} />
          ))}
        </div>
        <div className="project-actions reveal">
          <LinkButton href={project.repo} variant="ghost">
            <GithubLogo size={18} weight="duotone" />
            Source
          </LinkButton>
          <LinkButton href={project.live}>
            <ArrowSquareOut size={18} weight="duotone" />
            {project.name === "Buddy" ? "Website" : "README"}
          </LinkButton>
        </div>
      </div>
      <div className="project-visual reveal">
        {project.name === "Buddy" ? (
          <BuddyShowcase themeMode={themeMode} />
        ) : (
          <div className="contextos-visual-stack">
            <div className="gif-frame">
              <img
                src="https://raw.githubusercontent.com/khovan123/contextOS/main/docs/demo/contextos-demo.gif"
                alt="ContextOS terminal demo from README"
                loading="lazy"
              />
            </div>
            <NpmDownloadGraph />
          </div>
        )}
      </div>
    </article>
  );
}

function App() {
  useScrollReveal();
  const [themeMode, setThemeMode] = React.useState<ThemeMode>("light");
  const [contactOpen, setContactOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  return (
    <main>
      <CustomCursor />
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
      <div className="grain" />
      <nav className="dock" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#resume">Resume</a>
        <a href="#contact">Contact</a>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setThemeMode((current) => (current === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
        >
          {themeMode === "light" ? <Moon size={16} weight="duotone" /> : <Sun size={16} weight="duotone" />}
        </button>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="section-kicker reveal">Full-stack developer / AI systems / cloud services</span>
          <AnimatedText as="h1" className="hero-name">
            Phan Nguyen Quoc Minh
          </AnimatedText>
          <AnimatedText as="h2" className="hero-statement">
            Builds production software with visible systems thinking.
          </AnimatedText>
          <p className="copy-reveal reveal">
            I design and ship web products that connect polished interfaces, reliable backend services, AI workflows,
            and practical infrastructure.
          </p>
          <div className="hero-actions reveal">
            <LinkButton href="#work" variant="ghost">
              <BracketsCurly size={18} weight="duotone" />
              View work
            </LinkButton>
            <LinkButton href="/cv.pdf" download="Phan-Nguyen-Quoc-Minh-Resume.pdf">
              <DownloadSimple size={18} weight="duotone" />
              Resume
            </LinkButton>
          </div>
        </div>
        <div className="hero-stage reveal">
          <SystemsScene />
          <div className="avatar-card reveal">
            <img src="/me.jpg" alt="Phan Nguyen Quoc Minh portrait" />
            <div>
              <strong>@khovan123</strong>
              <span>AI-assisted platforms, distributed systems, developer tools</span>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="Technology stack">
        <div>
          {[...stack, ...stack].map((item, index) => (
            <TechTag item={item} compact key={`${item}-${index}`} />
          ))}
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-lead">
          <span className="section-kicker reveal">Focus</span>
          <AnimatedText>Product-minded engineering across frontend, backend, AI, and deployment.</AnimatedText>
        </div>
        <div className="focus-grid">
          <div className="stagger-child" style={{ "--i": 0 } as React.CSSProperties}>
            <Code size={28} weight="duotone" />
            <h3>Modern web interfaces</h3>
            <p>React, Next.js, streaming UI, component systems, and responsive product experiences.</p>
          </div>
          <div className="stagger-child" style={{ "--i": 1 } as React.CSSProperties}>
            <Database size={28} weight="duotone" />
            <h3>Service architecture</h3>
            <p>NestJS, FastAPI, CQRS, data modeling, queues, retries, observability, and deployment flows.</p>
          </div>
          <div className="stagger-child" style={{ "--i": 2 } as React.CSSProperties}>
            <Sparkle size={28} weight="duotone" />
            <h3>AI product depth</h3>
            <p>RAG, semantic search, recommendations, model lifecycle, citations, and agent context tooling.</p>
          </div>
          <div className="stagger-child" style={{ "--i": 3 } as React.CSSProperties}>
            <Cloud size={28} weight="duotone" />
            <h3>Cloud readiness</h3>
            <p>Docker, Vercel, Fly.io, Azure Container Apps, GitHub Actions, and production-backed local flows.</p>
          </div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Engineering metrics">
        {metrics.map(([value, label], index) => (
          <div className="stagger-child" style={{ "--i": index } as React.CSSProperties} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section id="work" className="work-section">
        <div className="section-heading">
          <span className="section-kicker reveal">Selected work</span>
          <AnimatedText>Projects shown as systems, not screenshots only.</AnimatedText>
        </div>
        {projects.map((project, index) => (
          <ProjectPanel key={project.name} project={project} index={index} themeMode={themeMode} />
        ))}
      </section>

      <section id="resume" className="resume-section">
        <div className="reveal">
          <span className="section-kicker reveal">Resume</span>
          <AnimatedText>Full-stack resume embedded for quick review.</AnimatedText>
          <p className="copy-reveal reveal">
            Open the PDF directly if the browser blocks inline preview. The portfolio keeps the resume one click away
            from the hero and contact section.
          </p>
          <LinkButton href="/cv.pdf" download="Phan-Nguyen-Quoc-Minh-Resume.pdf">
            <DownloadSimple size={18} weight="duotone" />
            Resume
          </LinkButton>
        </div>
        <a
          className="resume-preview reveal"
          download="Phan-Nguyen-Quoc-Minh-Resume.pdf"
          href="/cv.pdf"
          aria-label="Download resume PDF"
        >
          <img src="/resume-preview.png" alt="Preview of Phan Nguyen Quoc Minh full-stack resume" />
        </a>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <span className="section-kicker reveal">Available for full-stack roles</span>
          <AnimatedText>Need a developer who can connect product UI to real backend systems?</AnimatedText>
        </div>
        <div className="contact-actions reveal">
          <LinkButton href="https://github.com/khovan123">
            <GithubLogo size={18} weight="duotone" />
            GitHub profile
          </LinkButton>
          <button className="button ghost" type="button" onClick={() => setContactOpen(true)}>
            <EnvelopeSimple size={18} weight="duotone" />
            Send mail
          </button>
        </div>
      </section>

      <footer>
        <span>Phan Nguyen Quoc Minh</span>
        <span>Built with React, Three.js, and project data from GitHub READMEs.</span>
        <a href="https://github.com/khovan123/khovan123" target="_blank" rel="noreferrer">
          <GitBranch size={16} weight="duotone" />
          Profile README
        </a>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
