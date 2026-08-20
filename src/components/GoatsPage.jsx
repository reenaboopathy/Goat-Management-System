  import React, { useEffect, useMemo, useState } from "react";
  import {
    ArrowLeft, Search, Play, MoreVertical, ChevronDown, Camera, CalendarDays,
    Scale, Tag, Heart, ShoppingBag, Plus, Check, Pencil, Info, GitBranch, X,
    Trash2, RefreshCw, FileText, Download, Archive, Activity, Wifi, Save,
    CheckCircle,
  } from "lucide-react";
  /* =========================================================
    THEME + GLOBAL STYLES
    All colors/spacing live here once, as CSS variables + classes,
    instead of being repeated across dozens of JS style objects.
  ========================================================= */

  function GlobalStyle() {
    return (
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        button, input, select, textarea { font-family: inherit; }

        .gp-app {
          --primary: #2F6FED; --primary-dark: #2355C9;
          --navy: #12336B; --navy-dark: #0B2545;
          --text: #16233D; --text-muted: #5A6B87; --text-faint: #8CA0C2; --text-faint2: #93A6C6;
          --border: #DCE6F9; --border-light: #E4ECFB;
          --bg-soft: #F8FAFF; --bg-page: #F3F7FF; --bg-page2: #EAF1FD;
          --danger: #DC2626; --danger-dark: #B91C1C;
          --success: #16834A; --success-bg: #E8F8EE;
          --warning: #FFC857;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page2) 100%);
          color: var(--text);
        }

        .gp-header { background: linear-gradient(135deg, var(--navy), var(--navy-dark)); padding: 18px 16px; color: #fff; }
        .gp-header-inner { max-width: 1180px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .gp-back { display: flex; align-items: center; gap: 10px; border: none; background: transparent; color: #fff; cursor: pointer; font-size: 16px; font-weight: 700; }
        .gp-icon-btn { border: none; background: rgba(255,255,255,.14); color: #fff; width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .12s ease; }
        .gp-icon-btn:hover { transform: translateY(-1px); }
        .gp-icon-row { display: flex; gap: 10px; }

        .gp-content { max-width: 1180px; margin: 0 auto; padding: 22px 16px 90px; }

        .gp-filters { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; margin-bottom: 13px; }
        .gp-filter-btn { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--navy); font-weight: 700; }

        .gp-notice { background: #FFF7E6; color: #8A5A00; border: 1px solid #FCE4B0; border-radius: 12px; padding: 12px 16px; margin-bottom: 13px; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }

        .gp-empty { min-height: 300px; background: #fff; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; text-align: center; box-shadow: 0 4px 18px rgba(37,99,235,.08); border: 1px solid var(--border-light); }

        .gp-fab { position: fixed; right: 22px; bottom: 22px; background: linear-gradient(135deg, #3B7CF7, var(--primary-dark)); color: #fff; border: none; border-radius: 30px; padding: 15px 26px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 15px; box-shadow: 0 14px 28px rgba(35,85,201,.35); z-index: 20; transition: transform .12s ease; }
        .gp-fab:hover { transform: translateY(-1px); }

        .gp-goat-card { background: #fff; min-height: 150px; border-radius: 18px; margin-bottom: 15px; padding: 18px 16px; display: flex; align-items: center; gap: 18px; box-shadow: 0 4px 16px rgba(15,42,87,.07); border: 1px solid var(--border-light); position: relative; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
        .gp-goat-card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(37,99,235,.14); border-color: #C7DBFB; }
        .gp-goat-click { display: flex; align-items: center; gap: 18px; flex: 1; min-width: 0; cursor: pointer; }
        .gp-goat-photo { width: 100px; height: 100px; flex-shrink: 0; border-radius: 16px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(145deg,#EAF1FE,#DCE9FD); font-size: 54px; }
        .gp-goat-photo img { width: 100%; height: 100%; object-fit: cover; }
        .gp-goat-tag { color: #89A0C4; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .gp-goat-name { margin: 0 0 6px; color: #0F2A57; font-size: 19px; font-weight: 800; }
        .gp-goat-breed { color: var(--text-muted); font-size: 13px; }
        .gp-goat-stage { margin-top: 6px; color: var(--primary); font-size: 12px; font-weight: 700; }
        .gp-goat-gender { align-self: flex-end; margin-bottom: 4px; margin-right: 20px; color: #7C8CA6; font-size: 13px; font-weight: 600; }

        .gp-card-menu-btn { border: none; background: transparent; cursor: pointer; color: #375380; padding: 5px; border-radius: 8px; }
        .gp-card-menu-backdrop { position: fixed; inset: 0; z-index: 40; }
        .gp-card-menu { position: absolute; top: calc(100% + 6px); right: 0; background: #fff; border-radius: 12px; box-shadow: 0 14px 32px rgba(15,42,87,.18); border: 1px solid var(--border-light); overflow: hidden; min-width: 160px; z-index: 41; }
        .gp-menu-item { width: 100%; display: flex; align-items: center; gap: 10px; padding: 11px 14px; border: none; background: transparent; cursor: pointer; font-size: 13.5px; font-weight: 650; color: var(--text); text-align: left; transition: background .12s ease; }
        .gp-menu-item:hover { background: #F0F5FF; }
        .gp-menu-item.danger { color: var(--danger); }
        .gp-menu-divider { height: 1px; background: var(--border-light); margin: 5px 0; }

        .gp-modal-overlay { position: fixed; inset: 0; background: rgba(11,37,69,.45); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 500; }
        .gp-modal { background: #fff; border-radius: 18px; padding: 24px; width: 100%; max-width: 620px; max-height: 88vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(11,37,69,.30); }
        .gp-modal.wide { max-width: 700px; }
        .gp-modal.narrow { max-width: 380px; }
        .gp-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .gp-modal-header h2 { margin: 0; color: var(--navy); font-size: 19px; font-weight: 800; }
        .gp-modal-close { width: 34px; height: 34px; border-radius: 9px; border: none; background: #F0F5FF; color: #375380; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .gp-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .gp-modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border-light); }
        .gp-muted-line { color: var(--text-muted); font-size: 13px; }

        .gp-field { margin-bottom: 15px; }
        .gp-field.full { grid-column: 1 / -1; }
        .gp-field label { display: block; margin-bottom: 7px; color: var(--text-muted); font-size: 12px; font-weight: 700; }
        .gp-input { width: 100%; height: 42px; border: 1px solid var(--border); border-radius: 10px; padding: 0 12px; color: var(--text); background: var(--bg-soft); font-size: 13px; outline: none; }
        .gp-textarea { height: 78px; padding-top: 10px; resize: vertical; }

        .gp-btn { height: 46px; padding: 0 22px; border-radius: 10px; font-size: 13px; font-weight: 750; cursor: pointer; display: inline-flex; align-items: center; gap: 9px; justify-content: center; transition: transform .12s ease; }
        .gp-btn:hover { transform: translateY(-1px); }
        .gp-btn-ghost { border: 1px solid var(--border); background: #fff; color: var(--text-muted); }
        .gp-btn-primary { border: none; background: linear-gradient(135deg,#3B7CF7,var(--primary-dark)); color: #fff; }
        .gp-btn-danger { border: none; background: linear-gradient(135deg,#EF4444,var(--danger)); color: #fff; }
        .gp-link-btn { display: flex; align-items: center; gap: 7px; border: none; background: transparent; color: var(--primary-dark); font-size: 12.5px; font-weight: 700; cursor: pointer; padding: 4px 0 2px; }

        .gp-hero { position: relative; min-height: 250px; background: linear-gradient(160deg, var(--primary) 0%, var(--navy) 100%); display: flex; flex-direction: column; align-items: center; padding-bottom: 26px; }
        .gp-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.16), transparent 60%); pointer-events: none; }
        .gp-hero-top { position: relative; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 16px 16px 0; z-index: 20; }
        .gp-hero-btn { width: 40px; height: 40px; border-radius: 12px; border: none; background: rgba(255,255,255,.20); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .gp-hero-photo { position: relative; z-index: 1; margin-top: 24px; width: 108px; height: 108px; border-radius: 22px; background: #fff; box-shadow: 0 12px 28px rgba(0,0,0,.20); display: flex; align-items: center; justify-content: center; overflow: hidden; font-size: 58px; }
        .gp-hero-photo img { width: 100%; height: 100%; object-fit: cover; }
        .gp-hero-name { position: relative; z-index: 1; margin-top: 14px; color: #fff; font-size: 21px; font-weight: 800; }
        .gp-hero-sub { position: relative; z-index: 1; margin-top: 4px; color: rgba(255,255,255,.82); font-size: 12.5px; font-weight: 600; }

        .gp-detail-menu { position: absolute; right: 0; top: 48px; width: 210px; background: #fff; border-radius: 14px; padding: 7px; box-shadow: 0 18px 45px rgba(11,37,69,.30); border: 1px solid var(--border-light); z-index: 999; }
        .gp-detail-menu .gp-menu-item { border-radius: 9px; }

        .gp-tabs { display: flex; background: #fff; border-bottom: 1px solid var(--border-light); }
        .gp-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 10px; border: none; background: transparent; color: var(--text-faint); font-weight: 700; font-size: 13.5px; cursor: pointer; border-bottom: 3px solid transparent; }
        .gp-tab.active { color: var(--primary-dark); border-bottom-color: var(--primary-dark); }
        .gp-tab-badge { background: var(--primary); color: #fff; border-radius: 20px; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; }

        .gp-body { max-width: 720px; margin: 0 auto; padding: 16px 14px 0; display: flex; flex-direction: column; gap: 16px; }
        .gp-panel { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(15,42,87,.07); border: 1px solid var(--border-light); }
        .gp-panel-header { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: #fff; padding: 13px 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 800; font-size: 14px; }
        .gp-panel-header button { width: 30px; height: 30px; border-radius: 9px; border: none; background: rgba(255,255,255,.22); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .gp-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 16px; border-bottom: 1px solid #F0F4FC; gap: 15px; }
        .gp-row:last-child { border-bottom: none; }
        .gp-row-label { color: var(--text-faint); font-size: 13px; }
        .gp-row-value { display: flex; align-items: center; gap: 10px; text-align: right; color: var(--navy); font-size: 13.5px; font-weight: 700; }
        .gp-empty-note { padding: 26px 20px; text-align: center; color: var(--text-faint2); font-size: 12.5px; line-height: 1.6; }

        .gp-strip { border: none; background: linear-gradient(135deg,#3B7CF7,var(--primary-dark)); color: #fff; border-radius: 30px; padding: 15px 18px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700; font-size: 13.5px; cursor: pointer; }
        .gp-strip-outline { border: 1px solid var(--border); background: #fff; color: var(--navy); border-radius: 16px; padding: 15px 18px; display: flex; align-items: center; justify-content: space-between; font-weight: 700; font-size: 13.5px; cursor: pointer; box-shadow: 0 4px 16px rgba(15,42,87,.06); }
        .gp-strip-outline .left { display: flex; align-items: center; gap: 10px; color: var(--primary-dark); }
        .gp-strip-outline .right { color: var(--text-muted); font-weight: 700; }

        .gp-event-card { background: #fff; border: 1px solid var(--border-light); border-radius: 14px; padding: 14px; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 14px rgba(15,42,87,.06); }
        .gp-event-icon { width: 42px; height: 42px; border-radius: 11px; background: #EAF1FE; color: var(--primary); display: flex; align-items: center; justify-content: center; }
        .gp-event-badge { background: #EEF4FF; color: var(--primary-dark); border-radius: 20px; padding: 5px 8px; font-size: 10px; font-weight: 700; }

        .gp-report-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
        .gp-report-box { background: var(--bg-soft); border: 1px solid var(--border); border-radius: 10px; padding: 13px; }
        .gp-report-box .label { color: var(--text-faint); font-size: 11px; margin-bottom: 4px; }
        .gp-report-box strong { color: var(--navy); font-size: 14px; }

        .gp-select-modal { background: #fff; border-radius: 18px; padding: 18px; width: 100%; max-width: 340px; box-shadow: 0 24px 60px rgba(11,37,69,.30); }
        .gp-select-search { width: 100%; height: 40px; border: 1px solid var(--border); border-radius: 10px; padding: 0 12px; margin-bottom: 10px; font-size: 13px; outline: none; }
        .gp-select-option { width: 100%; text-align: left; padding: 10px; border: none; background: transparent; border-radius: 9px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: var(--text); font-size: 13.5px; font-weight: 600; }
        .gp-select-option.active { background: #EAF1FE; color: var(--primary-dark); }
        .gp-select-option:hover { background: #F0F5FF; }

        .gp-form-header { background: linear-gradient(135deg, var(--navy), var(--navy-dark)); padding: 17px 20px; color: #fff; }
        .gp-form-header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .gp-form-back { display: flex; align-items: center; gap: 9px; border: none; background: transparent; color: #fff; cursor: pointer; font-size: 15px; font-weight: 700; }
        .gp-form-save { border: none; border-radius: 10px; background: rgba(255,255,255,.16); color: #fff; padding: 10px 16px; font-size: 11px; font-weight: 800; cursor: pointer; }
        .gp-form { max-width: 1050px; margin: 0 auto; padding: 42px 20px 70px; }
        .gp-form-title { text-align: center; margin-bottom: 30px; }
        .gp-eyebrow { color: var(--primary); font-size: 10px; font-weight: 800; letter-spacing: 1.7px; margin-bottom: 7px; }
        .gp-form-title h1 { margin: 0; color: var(--navy-dark); font-size: 34px; font-weight: 800; }
        .gp-form-title p { margin: 8px 0 0; color: #6B7C9A; font-size: 14px; }

        .gp-photo-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 25px; text-align: center; }
        .gp-photo-drop { height: 235px; border: 2px dashed #A9C6F8; border-radius: 16px; background: linear-gradient(145deg,#F6FAFF,#EAF2FE); display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .gp-photo-drop img { width: 100%; height: 100%; object-fit: cover; }
        .gp-photo-icon { width: 70px; height: 70px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 12px; }
        .gp-photo-upload { display: inline-flex; align-items: center; gap: 7px; margin-top: 15px; padding: 10px 17px; border-radius: 10px; background: #EAF1FE; color: var(--primary-dark); font-size: 12px; font-weight: 750; cursor: pointer; }

        .gp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
        .gp-three-col { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .gp-form-card { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 25px; margin-top: 18px; }
        .gp-section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 23px; }
        .gp-section-icon { width: 40px; height: 40px; border-radius: 11px; background: #EAF1FE; color: var(--primary-dark); display: flex; align-items: center; justify-content: center; }
        .gp-section-num { display: block; font-size: 9px; color: var(--text-faint); font-weight: 800; letter-spacing: 1px; }
        .gp-section-title h2 { margin: 2px 0 0; font-size: 17px; color: var(--navy); }

        .gp-visual-field { margin-bottom: 18px; }
        .gp-visual-wrap { height: 45px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-soft); display: flex; align-items: center; overflow: hidden; }
        .gp-visual-prefix { padding-left: 13px; color: #7891B6; font-weight: 750; }
        .gp-visual-input { flex: 1; height: 100%; border: none; outline: none; background: transparent; padding: 0 13px; color: var(--text); font-size: 13px; }
        .gp-readonly { height: 45px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-soft); display: flex; align-items: center; justify-content: space-between; padding: 0 13px; color: var(--text); font-size: 13px; font-weight: 650; margin-bottom: 19px; }

        .gp-gender-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
        .gp-gender-btn { height: 45px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-soft); color: #6B7C9A; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; }
        .gp-gender-btn.active { border-color: #4E8AF4; background: #EAF1FE; color: var(--primary-dark); }

        .gp-timeline-field { display: flex; align-items: center; gap: 12px; }
        .gp-timeline-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 11px; background: #EAF1FE; color: var(--primary); display: flex; align-items: center; justify-content: center; }
        .gp-timeline-field label { display: block; margin-bottom: 5px; color: var(--text-muted); font-size: 12px; font-weight: 700; }
        .gp-timeline-input { border: none; outline: none; padding: 0; color: var(--text); background: transparent; font-size: 13px; font-weight: 700; }
        .gp-weight-wrap { display: flex; align-items: center; gap: 6px; }
        .gp-kg { color: var(--text-faint); font-size: 12px; font-weight: 700; }

        .gp-stage-row { display: flex; align-items: center; justify-content: space-between; }
        .gp-hint { margin: 3px 0 0; color: var(--text-faint2); font-size: 11px; }
        .gp-stage-select { width: 180px; height: 42px; border: 1px solid var(--border); border-radius: 10px; padding: 0 12px; color: var(--text); background: var(--bg-soft); outline: none; font-weight: 650; }

        .gp-origin-heading { display: flex; align-items: center; gap: 13px; margin-bottom: 16px; }
        .gp-origin-num { width: 31px; height: 31px; border-radius: 9px; background: var(--primary-dark); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; }
        .gp-origin-heading h2 { margin: 0; color: var(--navy); font-size: 17px; }
        .gp-origin-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .gp-origin-card { position: relative; min-height: 90px; padding: 17px; border: 1px solid var(--border); border-radius: 14px; background: #fff; display: flex; align-items: center; gap: 13px; text-align: left; cursor: pointer; }
        .gp-origin-card.active { border-color: #4E8AF4; background: #F1F6FE; }
        .gp-origin-icon { width: 43px; height: 43px; flex-shrink: 0; border-radius: 12px; background: #EAF1FE; color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-size: 21px; }
        .gp-origin-title { display: block; color: var(--text); font-size: 13px; }
        .gp-origin-subtitle { display: block; margin-top: 4px; color: var(--text-faint2); font-size: 10px; }
        .gp-origin-check { position: absolute; right: 10px; top: 10px; width: 20px; height: 20px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; }

        .gp-error { margin-top: 18px; padding: 13px 15px; border-radius: 12px; background: #FEF2F2; border: 1px solid #FECACA; color: var(--danger-dark); font-size: 13px; font-weight: 600; }
        .gp-form-actions { display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-top: 30px; padding-top: 23px; border-top: 1px solid var(--border-light); }

        .gp-scale-header { background: linear-gradient(135deg, var(--navy), var(--navy-dark)); padding: 18px 16px; color: #fff; }
        .gp-scale-header-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; }
        .gp-scale-back { display: flex; align-items: center; gap: 8px; border: none; background: rgba(255,255,255,.14); color: #fff; cursor: pointer; font-size: 13px; font-weight: 700; padding: 9px 14px; border-radius: 10px; justify-self: start; }
        .gp-scale-title { text-align: center; font-size: 18px; font-weight: 800; }
        .gp-scale-subtitle { text-align: center; margin-top: 2px; font-size: 11.5px; color: rgba(255,255,255,.75); }
        .gp-scale-connected { justify-self: end; display: flex; align-items: center; gap: 7px; background: rgba(97,255,145,.16); color: #61FF91; padding: 9px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .gp-scale-body { max-width: 900px; margin: 0 auto; padding: 22px 16px 60px; display: flex; flex-direction: column; gap: 18px; }
        .gp-scale-goat { background: #fff; border-radius: 17px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 16px rgba(15,42,87,.07); border: 1px solid var(--border-light); }
        .gp-scale-avatar { width: 60px; height: 60px; flex-shrink: 0; border-radius: 15px; background: linear-gradient(145deg,#EAF1FE,#DCE9FD); display: flex; align-items: center; justify-content: center; font-size: 34px; }
        .gp-scale-goat-name { color: #0F2A57; font-size: 17px; font-weight: 800; }
        .gp-scale-goat-meta { margin-top: 4px; color: var(--text-muted); font-size: 12.5px; }
        .gp-scale-last { text-align: right; }
        .gp-scale-last label { display: block; color: var(--text-faint); font-size: 10.5px; font-weight: 800; letter-spacing: .5px; }
        .gp-scale-last strong { display: block; margin-top: 5px; font-size: 21px; color: var(--navy); }
        .gp-scale-card { background: #fff; border-radius: 18px; padding: 30px; text-align: center; border: 1px solid var(--border-light); box-shadow: 0 4px 16px rgba(15,42,87,.07); }
        .gp-scale-heading { display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; color: var(--text-muted); font-size: 12.5px; letter-spacing: .5px; }
        .gp-scale-lcd { max-width: 460px; margin: 20px auto; padding: 26px; border-radius: 16px; background: #0B1220; }
        .gp-scale-number { font-family: SFMono-Regular, Menlo, monospace; font-size: 62px; font-weight: 800; color: #61FF91; }
        .gp-scale-number span { font-size: 22px; margin-left: 8px; }
        .gp-scale-status { margin-top: 8px; display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 12.5px; }
        .gp-scale-status.stable { color: #61FF91; }
        .gp-scale-status.measuring { color: var(--warning); }
        @keyframes gp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }
        .gp-scale-platform { width: 300px; margin: 28px auto 8px; }
        .gp-platform-top { height: 78px; border: 4px solid #9DA5AD; background: #DCE0E4; border-radius: 15px 15px 5px 5px; display: flex; align-items: center; justify-content: center; font-size: 42px; }
        .gp-platform-mid { height: 56px; background: #707981; padding: 11px 24px; }
        .gp-platform-mid div { height: 3px; background: #ABB1B6; margin-bottom: 7px; }
        .gp-platform-legs { display: flex; justify-content: space-between; padding: 0 24px; }
        .gp-platform-legs i { width: 14px; height: 23px; background: #444B52; display: block; }
        .gp-scale-instruction { color: var(--text-faint); font-size: 13px; margin-top: 6px; }
        .gp-scale-save { background: #fff; border-radius: 16px; padding: 20px; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 16px; border: 1px solid var(--border-light); }
        .gp-scale-save h3 { margin: 0; color: var(--navy); font-size: 15px; }
        .gp-scale-save p { margin: 4px 0 0; color: var(--text-muted); font-size: 12.5px; }
        .gp-scale-success { background: var(--success-bg); color: var(--success); padding: 13px; border-radius: 10px; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; }
        .gp-scale-panel { background: #fff; border-radius: 16px; padding: 20px; border: 1px solid var(--border-light); }
        .gp-scale-panel h3 { margin: 0 0 14px; color: var(--navy); font-size: 15px; }
        .gp-hw-flow { display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; }
        .gp-hw-node { border: 1px solid var(--border-light); background: var(--bg-soft); padding: 12px 17px; border-radius: 10px; text-align: center; color: var(--navy); }
        .gp-hw-node small { display: block; margin-top: 4px; color: var(--text-faint); font-weight: 500; }
        .gp-hw-arrow { color: var(--text-faint); font-size: 18px; }
        .gp-history-row { display: flex; justify-content: space-between; border-top: 1px solid #F0F4FC; padding: 12px 0; }
        .gp-history-row:first-child { border-top: none; }
        .gp-history-row strong { display: block; color: var(--navy); font-size: 13.5px; }
        .gp-history-row small { display: block; margin-top: 3px; color: var(--text-faint); font-size: 11px; }

        @media (max-width: 760px) {
          .gp-two-col, .gp-three-col, .gp-origin-grid, .gp-modal-grid,
          .gp-scale-header-inner, .gp-scale-goat, .gp-scale-save { grid-template-columns: 1fr !important; }
          .gp-goat-card { flex-wrap: wrap; }
          .gp-filters { grid-template-columns: 1fr !important; }
          .gp-scale-save { display: flex !important; flex-direction: column; align-items: stretch !important; }
          .gp-scale-connected { margin-left: 0 !important; justify-self: stretch; }
        }
      `}</style>
    );
  }

  /* =========================================================
    DATA + HELPERS
  ========================================================= */

  const SAMPLE_GOATS = [];

  // tenant is the shared source used by GoatsPage + EventsPage.
  const TENANT_STORAGE_KEYS = ["tenant", "currentTenant", "tenantData"];

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function getStoredTenant() {
    if (typeof window === "undefined") return null;

    for (const key of TENANT_STORAGE_KEYS) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = safeParse(raw);
      if (parsed && typeof parsed === "object") return parsed;
    }

    return null;
  }

  function getTenantStorageKey() {
    if (typeof window === "undefined") return "tenant";

    for (const key of TENANT_STORAGE_KEYS) {
      if (localStorage.getItem(key) !== null) return key;
    }

    return "tenant";
  }

  function getTenantGoats() {
    const tenant = getStoredTenant();
    if (tenant?.data && Array.isArray(tenant.data.goats)) {
      return tenant.data.goats;
    }

    // One-time migration for goats created by the previous GoatsPage version.
    // No SAMPLE_GOATS are inserted.
    try {
      const old = safeParse(localStorage.getItem("goatsList"));
      if (Array.isArray(old) && old.length > 0) {
        persistTenantGoats(old);
        return old;
      }
    } catch {
      // ignore migration errors
    }

    return [];
  }

  function persistTenantGoats(goats) {
    if (typeof window === "undefined") return;

    const existing = getStoredTenant() || {};
    const updated = {
      ...existing,
      data: {
        ...(existing.data || {}),
        goats: Array.isArray(goats) ? goats : [],
        events: Array.isArray(existing.data?.events) ? existing.data.events : [],
      },
    };

    try {
      localStorage.setItem(getTenantStorageKey(), JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("tenant-data-updated", { detail: updated })
      );
    } catch (error) {
      console.error("tenant.data.goats save error:", error);
    }
  }

  const BREEDS = ["All Breeds", "Alpine", "Boer", "Kiko", "Nubian"];
  const GROUPS = ["All Groups"];
  const STAGE_OPTIONS = {
    Female: ["Kid", "Doeling", "Doe"],
    Male: ["Kid", "Buckling", "Buck", "Wether"],
  };
  const EVENT_TYPES = ["Health Check", "Vaccination", "Treatment", "Breeding", "Purchase", "Sale", "Other"];
  const ORIGIN_OPTIONS = [
    { value: "Born on farm", icon: "🐐", title: "Born Here", subtitle: "Born on your farm" },
    { value: "Purchased", icon: <ShoppingBag size={20} />, title: "Purchased", subtitle: "Bought from another farm" },
    { value: "Other", icon: <Plus size={21} />, title: "Other", subtitle: "Another source" },
  ];

  const todayISO = () => new Date().toISOString().slice(0, 10);
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const makeEvent = (type, title, extra = {}) => ({ id: Date.now(), type, title, date: todayISO(), ...extra });

  function calcAge(dob) {
    if (!dob) return "-";
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) return "-";
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months -= 1;
    months = Math.max(0, months);
    const years = Math.floor(months / 12);
    return years > 0 ? `${years}y ${months % 12}m` : `${months % 12}m`;
  }

  /* =========================================================
    SHARED UI PRIMITIVES
  ========================================================= */

  function Modal({ title, onClose, children, footer, size }) {
    return (
      <div className="gp-modal-overlay" onClick={onClose}>
        <div className={`gp-modal ${size || ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="gp-modal-header">
            <h2>{title}</h2>
            <button type="button" className="gp-modal-close" onClick={onClose}><X size={18} /></button>
          </div>
          {children}
          {footer && <div className="gp-modal-actions">{footer}</div>}
        </div>
      </div>
    );
  }

  function ConfirmDialog({ title, message, confirmLabel, danger = true, onConfirm, onCancel }) {
    return (
      <Modal
        title={title}
        onClose={onCancel}
        size="narrow"
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onCancel}>Cancel</button>
            <button type="button" className={`gp-btn ${danger ? "gp-btn-danger" : "gp-btn-primary"}`} onClick={onConfirm}>{confirmLabel}</button>
          </>
        }
      >
        <p className="gp-muted-line" style={{ lineHeight: 1.6 }}>{message}</p>
      </Modal>
    );
  }

  function Field({ label, full, children }) {
    return (
      <div className={`gp-field${full ? " full" : ""}`}>
        <label>{label}</label>
        {children}
      </div>
    );
  }

  function renderControl(field, value, onChange, form) {
    if (field.type === "select") {
      const opts = typeof field.options === "function" ? field.options(form) : field.options;
      return (
        <select className="gp-input" value={value} onChange={(e) => onChange(e.target.value)}>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    if (field.type === "textarea") {
      return <textarea className="gp-input gp-textarea" value={value} onChange={(e) => onChange(e.target.value)} />;
    }
    return (
      <input
        className="gp-input"
        type={field.type || "text"}
        step={field.type === "number" ? "0.1" : undefined}
        min={field.type === "number" ? "0" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  function SimpleSelectModal({ title, options, selected, query, onQueryChange, onPick, onClose }) {
    const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
    return (
      <div className="gp-select-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gp-modal-header" style={{ marginBottom: 12 }}>
          <strong style={{ color: "var(--navy)", fontSize: 15 }}>{title}</strong>
          <button type="button" className="gp-modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <input className="gp-select-search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search..." />
        {filtered.length === 0 ? (
          <div style={{ padding: 15, color: "var(--text-faint)", fontSize: 13, textAlign: "center" }}>No options found</div>
        ) : (
          filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onPick(opt)}
              className={`gp-select-option${opt === selected ? " active" : ""}`}
            >
              {opt}
              {opt === selected && <Check size={16} />}
            </button>
          ))
        )}
      </div>
    );
  }

  /* =========================================================
    MAIN PAGE
  ========================================================= */

  export default function GoatsPageDemo({ onBack }) {
    /* =========================================================
      SHARED TENANT GOAT PERSISTENCE
      EventsPage also reads tenant.data.goats. Keep that as the
      single source of truth so Add/Edit/Delete/Refresh stay synced.
    ========================================================= */
    const [goatsList, setGoatsList] = useState(() => getTenantGoats());

    useEffect(() => {
      const syncFromTenant = (event) => {
        const tenant = event?.detail || getStoredTenant();
        setGoatsList(Array.isArray(tenant?.data?.goats) ? tenant.data.goats : []);
      };

      const syncFromStorage = (event) => {
        if (!event.key || TENANT_STORAGE_KEYS.includes(event.key)) {
          setGoatsList(getTenantGoats());
        }
      };

      window.addEventListener("tenant-data-updated", syncFromTenant);
      window.addEventListener("storage", syncFromStorage);

      return () => {
        window.removeEventListener("tenant-data-updated", syncFromTenant);
        window.removeEventListener("storage", syncFromStorage);
      };
    }, []);

    const [selectedBreed, setSelectedBreed] = useState("All Breeds");
    const [selectedGroup, setSelectedGroup] = useState("All Groups");
    const [breedModalOpen, setBreedModalOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [breedQuery, setBreedQuery] = useState("");
    const [groupQuery, setGroupQuery] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [pickBreedNotice, setPickBreedNotice] = useState(false);
    const [selectedGoatId, setSelectedGoatId] = useState(null);
    const [openMenuGoatId, setOpenMenuGoatId] = useState(null);
    const [editingGoat, setEditingGoat] = useState(null);
    const [removingGoat, setRemovingGoat] = useState(null);

    const goats = useMemo(
      () =>
        goatsList.filter(
          (g) =>
            (selectedBreed === "All Breeds" || g.breed === selectedBreed) &&
            (selectedGroup === "All Groups" || g.group === selectedGroup) &&
            !g.archived
        ),
      [goatsList, selectedBreed, selectedGroup]
    );

    const selectedGoat = useMemo(
      () => goatsList.find((g) => String(g.id) === String(selectedGoatId)) || null,
      [goatsList, selectedGoatId]
    );

    function handleAddClick() {
      if (selectedBreed === "All Breeds") {
        setPickBreedNotice(true);
        setBreedModalOpen(true);
        return;
      }
      setPickBreedNotice(false);
      setFormOpen(true);
    }

    function upsertGoat(goat) {
      setGoatsList((prev) => {
        const next = [...prev.filter((g) => String(g.id) !== String(goat.id)), goat];
        persistTenantGoats(next);
        return next;
      });
    }

    function saveGoat(goat) {
      setGoatsList((prev) => {
        const next = prev.map((g) => (String(g.id) === String(goat.id) ? goat : g));
        persistTenantGoats(next);
        return next;
      });
    }

    function removeGoat(goatId) {
      setGoatsList((prev) => {
        const next = prev.filter((g) => String(g.id) !== String(goatId));
        persistTenantGoats(next);
        return next;
      });
      if (String(selectedGoatId) === String(goatId)) setSelectedGoatId(null);
    }

    function archiveGoat(goatId) {
      setGoatsList((prev) => {
        const next = prev.map((g) => (String(g.id) === String(goatId) ? { ...g, archived: true } : g));
        persistTenantGoats(next);
        return next;
      });
      setSelectedGoatId(null);
    }

    if (formOpen) {
      return (
        <div className="gp-app">
          <GlobalStyle />
          <AddGoatForm
            breed={selectedBreed}
            onClose={() => setFormOpen(false)}
            onSave={(goat) => {
              upsertGoat(goat);
              setFormOpen(false);
              setPickBreedNotice(false);
              setSelectedGoatId(goat.id);
            }}
          />
        </div>
      );
    }

    if (selectedGoat) {
      return (
        <div className="gp-app">
          <GlobalStyle />
          <GoatDetailPage
            goat={selectedGoat}
            onBack={() => setSelectedGoatId(null)}
            onSave={saveGoat}
            onDelete={removeGoat}
            onArchive={archiveGoat}
          />
        </div>
      );
    }

    return (
      <div className="gp-app">
        <GlobalStyle />

        <div className="gp-header">
          <div className="gp-header-inner">
            <button type="button" className="gp-back" onClick={() => onBack?.()}>
              <ArrowLeft size={22} /> <span>Goats</span>
            </button>
            <div className="gp-icon-row">
              <button type="button" className="gp-icon-btn"><Search size={19} /></button>
              <button type="button" className="gp-icon-btn"><Play size={19} /></button>
              <button type="button" className="gp-icon-btn"><MoreVertical size={19} /></button>
            </div>
          </div>
        </div>

        <div className="gp-content">
          <div className="gp-filters">
            <button type="button" className="gp-filter-btn" onClick={() => setBreedModalOpen(true)}>
              <span>{selectedBreed}</span> <ChevronDown size={19} />
            </button>
            <button type="button" className="gp-filter-btn" onClick={() => setGroupModalOpen(true)}>
              <span>{selectedGroup}</span> <ChevronDown size={19} />
            </button>
          </div>

          {pickBreedNotice && (
            <div className="gp-notice">
              <span>Please select a specific breed before adding a goat.</span>
              <button type="button" className="gp-btn gp-btn-primary" style={{ height: 34, padding: "0 12px" }} onClick={() => setBreedModalOpen(true)}>
                Select Breed
              </button>
            </div>
          )}

          {goats.length === 0 ? (
            <div className="gp-empty">
              <div style={{ fontSize: 52 }}>🐐</div>
              <b style={{ color: "#0F2A57", fontSize: 16 }}>No goats have been registered for the selected filters as of yet!</b>
              <p style={{ color: "#7C8CA6", fontSize: 13 }}>Select a breed and click + Add to create a goat profile.</p>
            </div>
          ) : (
            goats.map((goat) => (
              <GoatProfileCard
                key={String(goat.id)}
                goat={goat}
                onOpen={() => setSelectedGoatId(goat.id)}
                menuOpen={openMenuGoatId === goat.id}
                onToggleMenu={() => setOpenMenuGoatId((prev) => (prev === goat.id ? null : goat.id))}
                onCloseMenu={() => setOpenMenuGoatId(null)}
                onEdit={() => { setOpenMenuGoatId(null); setEditingGoat(goat); }}
                onRemove={() => { setOpenMenuGoatId(null); setRemovingGoat(goat); }}
              />
            ))
          )}

          <button type="button" className="gp-fab" onClick={handleAddClick}>
            <Plus size={21} /> Add
          </button>
        </div>

        {breedModalOpen && (
          <div className="gp-modal-overlay" onClick={() => setBreedModalOpen(false)}>
            <SimpleSelectModal
              title="Select breed" options={BREEDS} selected={selectedBreed} query={breedQuery}
              onQueryChange={setBreedQuery}
              onPick={(b) => { setSelectedBreed(b); setBreedModalOpen(false); setBreedQuery(""); setPickBreedNotice(false); }}
              onClose={() => setBreedModalOpen(false)}
            />
          </div>
        )}

        {groupModalOpen && (
          <div className="gp-modal-overlay" onClick={() => setGroupModalOpen(false)}>
            <SimpleSelectModal
              title="Select group" options={GROUPS} selected={selectedGroup} query={groupQuery}
              onQueryChange={setGroupQuery}
              onPick={(g) => { setSelectedGroup(g); setGroupModalOpen(false); setGroupQuery(""); }}
              onClose={() => setGroupModalOpen(false)}
            />
          </div>
        )}

        {editingGoat && (
          <EditGoatModal
            goat={editingGoat}
            onClose={() => setEditingGoat(null)}
            onSave={(updated) => { saveGoat(updated); setEditingGoat(null); }}
          />
        )}

        {removingGoat && (
          <ConfirmDialog
            title="Delete goat"
            message={`Delete ${removingGoat.name || "this goat"} (#${removingGoat.tagNumber || "—"})? This cannot be undone.`}
            confirmLabel="Delete Goat"
            onConfirm={() => { removeGoat(removingGoat.id); setRemovingGoat(null); }}
            onCancel={() => setRemovingGoat(null)}
          />
        )}
      </div>
    );
  }

  /* =========================================================
    GOAT CARD
  ========================================================= */

  function GoatProfileCard({ goat, onOpen, menuOpen, onToggleMenu, onCloseMenu, onEdit, onRemove }) {
    return (
      <div className="gp-goat-card">
        <input type="checkbox" style={{ width: 22, height: 22, flexShrink: 0, cursor: "pointer", accentColor: "var(--primary)" }} aria-label={`Select ${goat.name || "goat"}`} onClick={(e) => e.stopPropagation()} />

        <div className="gp-goat-click" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}>
          <div className="gp-goat-photo">
            {goat.photo ? <img src={goat.photo} alt={goat.name || "Goat"} /> : "🐐"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="gp-goat-tag">#{goat.tagNumber || "—"}</div>
            <h3 className="gp-goat-name">{goat.name || "Unnamed Goat"}</h3>
            <div className="gp-goat-breed">{goat.breed || "Breed not specified"}</div>
            <div className="gp-goat-stage">{goat.stage || "Kid"}</div>
          </div>
          <div className="gp-goat-gender">{goat.gender || "—"}</div>
        </div>

        <div style={{ position: "relative", zIndex: menuOpen ? 100 : 2 }}>
          <button type="button" className="gp-card-menu-btn" aria-label="Goat options" onClick={(e) => { e.stopPropagation(); onToggleMenu(); }}>
            <MoreVertical size={22} />
          </button>
          {menuOpen && (
            <>
              <div className="gp-card-menu-backdrop" onClick={onCloseMenu} />
              <div className="gp-card-menu" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="gp-menu-item" onClick={onEdit}><Pencil size={15} /> Edit</button>
                <button type="button" className="gp-menu-item danger" onClick={onRemove}><Trash2 size={15} /> Delete Goat</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* =========================================================
    GOAT DETAIL PAGE
  ========================================================= */

  function GoatDetailPage({ goat, onBack, onSave, onDelete, onArchive }) {
    const [activeTab, setActiveTab] = useState("details");
    const [menuOpen, setMenuOpen] = useState(false);
    // One modal switch instead of 8 separate booleans.
    const [modal, setModal] = useState(null); // 'edit' | 'event' | 'stage' | 'weight' | 'scale' | 'report' | 'archive' | 'delete'

    const events = goat.events || [];

    const rows = [
      ["Tag No", goat.tagNumber || "-"],
      ["Name", goat.name || "-"],
      ["D.O.B", goat.dob || "-"],
      ["Age", calcAge(goat.dob)],
      ["Gender", goat.gender || "-"],
      ["Weight", goat.weight != null && goat.weight !== "" ? `${goat.weight} kg` : "-"],
      ["Stage", goat.stage || "-"],
      ["Breed", goat.breed || "-"],
      ["Group", goat.group && goat.group !== "All Groups" ? goat.group : "-"],
      ["Joined On", goat.dateOfEntry || "-"],
      ["Source", goat.obtained || "-"],
      ["Sire Tag", goat.sireTagNumber || "-", true],
      ["Dam Tag", goat.damTagNumber || "-", true],
      ["Notes", goat.notes || "-"],
    ];

    const updateGoat = (patch) => onSave({ ...goat, ...patch });
    const pushEvent = (event) => updateGoat({ events: [...events, event] });

    // Shared by the quick "Add Weight" modal AND the live scale, so every
    // recorded weight lands in the same place: goat.weight + the timeline.
    function addWeight(weight) {
      updateGoat({ weight: Number(weight), events: [...events, makeEvent("Weight", `Weight recorded: ${weight} kg`)] });
      setModal(null);
    }

    function addEvent(event) {
      pushEvent(makeEvent(event.type, event.title, { notes: event.notes, date: event.date }));
      setModal(null);
      setActiveTab("events");
    }

    function changeStage(stage) {
      updateGoat({ stage, events: [...events, makeEvent("Stage Change", `Stage changed to ${stage}`)] });
      setModal(null);
    }

    function exportPdf() {
      const popup = window.open("", "_blank", "width=900,height=700");
      if (!popup) { alert("Please allow pop-ups to export the PDF."); return; }
      const eventRows = events.map((e) => `<tr><td>${e.date || "-"}</td><td>${e.type || "-"}</td><td>${e.title || "-"}</td></tr>`).join("");
      const fieldRows = [
        ["Name", goat.name], ["Tag Number", goat.tagNumber], ["Breed", goat.breed], ["Gender", goat.gender],
        ["Stage", goat.stage], ["Date of Birth", goat.dob], ["Weight", goat.weight != null ? `${goat.weight} kg` : null],
        ["Source", goat.obtained], ["Farm Entry", goat.dateOfEntry], ["Sire Tag", goat.sireTagNumber],
        ["Dam Tag", goat.damTagNumber], ["Notes", goat.notes],
      ].map(([label, value]) => `<tr><td>${label}</td><td>${value || "-"}</td></tr>`).join("");

      popup.document.write(`<!DOCTYPE html><html><head><title>Goat Report - ${goat.name || "Goat"}</title>
        <style>body{font-family:Arial,sans-serif;padding:40px;color:#16233D}h1{color:#12336B}
        table{width:100%;border-collapse:collapse;margin-top:15px}th,td{border:1px solid #DCE6F9;padding:10px;text-align:left}
        th{background:#EEF4FF;color:#12336B}</style></head><body>
        <h1>Goat Profile Report</h1><p>#${goat.tagNumber || "-"} · ${goat.name || "Unnamed Goat"}</p>
        <table><tr><th>Field</th><th>Value</th></tr>${fieldRows}</table>
        <h2>Events</h2>${events.length ? `<table><tr><th>Date</th><th>Type</th><th>Description</th></tr>${eventRows}</table>` : "<p>No events recorded.</p>"}
        </body></html>`);
      popup.document.close();
      setTimeout(() => { popup.focus(); popup.print(); }, 400);
      setMenuOpen(false);
    }

    const menuActions = [
      { icon: Pencil, label: "Edit", onClick: () => setModal("edit") },
      { icon: CalendarDays, label: "Add Event", onClick: () => setModal("event") },
      { icon: RefreshCw, label: "Change Stage", onClick: () => setModal("stage") },
      { icon: Scale, label: "Add Weight", onClick: () => setModal("weight") },
      { icon: Wifi, label: "Live Scale", onClick: () => setModal("scale") },
      { icon: FileText, label: "View Report", onClick: () => setModal("report") },
      { icon: Download, label: "Export PDF", onClick: exportPdf },
      { divider: true },
      { icon: Archive, label: "Archive", onClick: () => setModal("archive") },
      { icon: Trash2, label: "Delete Goat", danger: true, onClick: () => setModal("delete") },
    ];

    // Live scale is a full-page swap, same pattern as the Add-Goat form.
    // Saving reuses addWeight() so the reading lands straight in the profile + timeline.
    if (modal === "scale") {
      return (
        <GoatWeightScale
          goat={goat}
          onBack={() => setModal(null)}
          onSave={(weight) => { addWeight(weight); setActiveTab("events"); }}
        />
      );
    }

    return (
      <>
        <div className="gp-hero">
          <div className="gp-hero-top">
            <button type="button" className="gp-hero-btn" onClick={onBack}><ArrowLeft size={22} /></button>
            <div style={{ position: "relative", zIndex: 100 }}>
              <button type="button" className="gp-hero-btn" onClick={() => setMenuOpen((p) => !p)}><MoreVertical size={20} /></button>
              {menuOpen && (
                <div className="gp-detail-menu">
                  {menuActions.map((a, i) =>
                    a.divider ? (
                      <div key={i} className="gp-menu-divider" />
                    ) : (
                      <button key={a.label} type="button" className={`gp-menu-item${a.danger ? " danger" : ""}`} onClick={() => { setMenuOpen(false); a.onClick(); }}>
                        <a.icon size={16} /> {a.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="gp-hero-photo">{goat.photo ? <img src={goat.photo} alt={goat.name || "Goat"} /> : "🐐"}</div>
          <div className="gp-hero-name">{goat.name || "Unnamed Goat"}</div>
          <div className="gp-hero-sub">#{goat.tagNumber || "—"} · {goat.breed || "Breed not specified"}</div>
        </div>

        <div className="gp-tabs">
          <button type="button" className={`gp-tab${activeTab === "details" ? " active" : ""}`} onClick={() => setActiveTab("details")}>
            <Info size={16} /> Details
          </button>
          <button type="button" className={`gp-tab${activeTab === "events" ? " active" : ""}`} onClick={() => setActiveTab("events")}>
            <CalendarDays size={16} /> Events
            {events.length > 0 && <span className="gp-tab-badge">{events.length}</span>}
          </button>
        </div>

        {activeTab === "details" ? (
          <div className="gp-body">
            <div className="gp-panel">
              <div className="gp-panel-header">
                <span>General Details</span>
                <button type="button" onClick={() => setModal("edit")}><Pencil size={16} /></button>
              </div>
              <div>
                {rows.map(([label, value, searchable]) => (
                  <div className="gp-row" key={label}>
                    <span className="gp-row-label">{label}:</span>
                    <div className="gp-row-value">
                      <span>{value}</span>
                      {searchable && value !== "-" && <Search size={16} style={{ color: "var(--primary)" }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className="gp-strip-outline" onClick={() => setModal("scale")}>
              <span className="left"><Wifi size={19} /> Weigh on live scale</span>
              <span className="right">{goat.weight != null ? `${goat.weight} kg` : "Not recorded"}</span>
            </button>

            <button type="button" className="gp-strip"><Camera size={19} /> Tap to upload a picture...</button>

            <div className="gp-panel">
              <div className="gp-panel-header"><span>Goat's Offspring</span> <GitBranch size={17} /></div>
              <div className="gp-empty-note">
                No offspring linked yet! To link one, edit the offspring's record and enter this goat's tag number in the Father's tag no field.
              </div>
            </div>
          </div>
        ) : (
          <div className="gp-body">
            <button type="button" className="gp-strip" onClick={() => setModal("event")}><Plus size={18} /> Add Event</button>

            {events.length === 0 ? (
              <div className="gp-panel">
                <div className="gp-empty-note">
                  <CalendarDays size={32} style={{ color: "var(--text-faint)", marginBottom: 10 }} />
                  <div>No events recorded yet for this goat.</div>
                </div>
              </div>
            ) : (
              events.slice().reverse().map((event) => (
                <div className="gp-event-card" key={event.id}>
                  <div className="gp-event-icon"><Activity size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: "var(--navy)", fontSize: 14 }}>{event.title || event.type}</strong>
                    <div style={{ color: "var(--text-faint)", fontSize: 11, marginTop: 4 }}>{event.date || "-"}</div>
                  </div>
                  <span className="gp-event-badge">{event.type}</span>
                </div>
              ))
            )}
          </div>
        )}

        {modal === "edit" && (
          <EditGoatModal goat={goat} onClose={() => setModal(null)} onSave={(updated) => { onSave(updated); setModal(null); }} />
        )}

        {modal === "event" && <AddEventModal onClose={() => setModal(null)} onSave={addEvent} />}

        {modal === "stage" && <ChangeStageModal goat={goat} onClose={() => setModal(null)} onSave={changeStage} />}

        {modal === "weight" && (
          <AddWeightModal currentWeight={goat.weight} onClose={() => setModal(null)} onSave={addWeight} onUseScale={() => setModal("scale")} />
        )}

        {modal === "report" && <ReportModal goat={goat} onClose={() => setModal(null)} onExport={exportPdf} />}

        {modal === "archive" && (
          <ConfirmDialog
            title="Archive Goat"
            message={`Move ${goat.name || "this goat"} (#${goat.tagNumber || "—"}) to archive?`}
            confirmLabel="Archive"
            danger={false}
            onConfirm={() => onArchive(goat.id)}
            onCancel={() => setModal(null)}
          />
        )}

        {modal === "delete" && (
          <ConfirmDialog
            title="Delete Goat"
            message={`Delete ${goat.name || "this goat"} (#${goat.tagNumber || "—"}) permanently? This cannot be undone.`}
            confirmLabel="Delete Goat"
            onConfirm={() => onDelete(goat.id)}
            onCancel={() => setModal(null)}
          />
        )}
      </>
    );
  }

  /* =========================================================
    ADD EVENT / CHANGE STAGE / ADD WEIGHT (small modals)
  ========================================================= */

  function AddEventModal({ onClose, onSave }) {
    const [type, setType] = useState(EVENT_TYPES[0]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(todayISO());
    const [notes, setNotes] = useState("");

    function submit(e) {
      e.preventDefault();
      if (!title.trim()) return;
      onSave({ type, title: title.trim(), date, notes: notes.trim() });
    }

    return (
      <Modal
        title="Add Event"
        onClose={onClose}
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" form="gp-add-event" className="gp-btn gp-btn-primary"><Check size={16} /> Add Event</button>
          </>
        }
      >
        <form id="gp-add-event" onSubmit={submit}>
          <Field label="Event Type">
            <select className="gp-input" value={type} onChange={(e) => setType(e.target.value)}>
              {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Event Title">
            <input className="gp-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vaccination completed" />
          </Field>
          <Field label="Date">
            <input className="gp-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Notes">
            <textarea className="gp-input gp-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." />
          </Field>
        </form>
      </Modal>
    );
  }

  function ChangeStageModal({ goat, onClose, onSave }) {
    const options = STAGE_OPTIONS[goat.gender || "Female"] || [];
    const [stage, setStage] = useState(goat.stage || options[0] || "");

    return (
      <Modal
        title="Change Stage"
        onClose={onClose}
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="button" className="gp-btn gp-btn-primary" onClick={() => onSave(stage)}><RefreshCw size={16} /> Change Stage</button>
          </>
        }
      >
        <p className="gp-muted-line">Current stage: <strong>{goat.stage || "-"}</strong></p>
        <Field label="New Life Stage">
          <select className="gp-input" value={stage} onChange={(e) => setStage(e.target.value)}>
            {options.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </Field>
      </Modal>
    );
  }

  function AddWeightModal({ currentWeight, onClose, onSave, onUseScale }) {
    const [weight, setWeight] = useState(currentWeight ?? "");

    function submit(e) {
      e.preventDefault();
      if (weight === "" || Number(weight) < 0) return;
      onSave(weight);
    }

    return (
      <Modal
        title="Add Weight"
        onClose={onClose}
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" form="gp-add-weight" className="gp-btn gp-btn-primary"><Scale size={16} /> Save Weight</button>
          </>
        }
      >
        <p className="gp-muted-line">Current weight: <strong>{currentWeight != null ? `${currentWeight} kg` : "Not recorded"}</strong></p>
        <form id="gp-add-weight" onSubmit={submit}>
          <Field label="New Weight (kg)">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input autoFocus className="gp-input" type="number" min="0" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ flex: 1 }} />
              <strong style={{ color: "var(--text-muted)" }}>kg</strong>
            </div>
          </Field>
        </form>
        {onUseScale && (
          <button type="button" className="gp-link-btn" onClick={onUseScale}><Wifi size={14} /> Use the live weighing scale instead</button>
        )}
      </Modal>
    );
  }

  /* =========================================================
    LIVE WEIGHING SCALE
    Reads/writes through the goat record itself (goat.weight +
    goat.events) instead of localStorage, so a reading saved here
    shows up immediately in Details and the Events tab.
  ========================================================= */

  function GoatWeightScale({ goat, onBack, onSave }) {
    const startingWeight = goat?.weight != null && goat.weight !== "" ? Number(goat.weight) : 30;
    const [weight, setWeight] = useState(startingWeight);
    const [stable, setStable] = useState(true);
    const [saved, setSaved] = useState(false);

    const weightHistory = (goat?.events || []).filter((e) => e.type === "Weight").slice().reverse();

    // DEMO LIVE SENSOR: drifts a little each tick to simulate a connected
    // scale settling on a value. On real hardware (ESP32 + HX711 load cell),
    // replace this interval with the incoming sensor value.
    useEffect(() => {
      const timer = setInterval(() => {
        setWeight((old) => Number(Math.max(1, old + (Math.random() - 0.5) * 0.3).toFixed(1)));
        setStable(Math.random() > 0.3);
      }, 700);
      return () => clearInterval(timer);
    }, []);

    function handleSave() {
      onSave(Number(weight.toFixed(1)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }

    const hardwareFlow = [
      { label: "Load Cell", note: "Weight sensor" },
      { label: "HX711", note: "ADC module" },
      { label: "ESP32", note: "Wi-Fi" },
      { label: "Goat profile", note: "Live weight" },
    ];

    return (
      <div className="gp-app">
        <GlobalStyle />
        <div className="gp-scale-header">
          <div className="gp-scale-header-inner">
            <button type="button" className="gp-scale-back" onClick={onBack}><ArrowLeft size={20} /> Back to {goat?.name || "goat"}</button>
            <div>
              <div className="gp-scale-title">Weighing Scale</div>
              <div className="gp-scale-subtitle">Real-time weight measurement</div>
            </div>
            <div className="gp-scale-connected"><Wifi size={15} /> Scale Connected</div>
          </div>
        </div>

        <div className="gp-scale-body">
          <div className="gp-scale-goat">
            <div className="gp-scale-avatar">🐐</div>
            <div style={{ flex: 1 }}>
              <div className="gp-scale-goat-name">{goat?.name || "Unnamed Goat"}</div>
              <div className="gp-scale-goat-meta">#{goat?.tagNumber || "—"} · {goat?.breed || "Breed not specified"}</div>
            </div>
            <div className="gp-scale-last">
              <label>LAST RECORDED</label>
              <strong>{goat?.weight != null ? `${goat.weight} kg` : "—"}</strong>
            </div>
          </div>

          <div className="gp-scale-card">
            <div className="gp-scale-heading"><Scale size={20} /> LIVE WEIGHT</div>
            <div className="gp-scale-lcd">
              <div className="gp-scale-number">{weight.toFixed(1)}<span>kg</span></div>
              {stable ? (
                <div className="gp-scale-status stable"><CheckCircle size={15} /> Weight stable</div>
              ) : (
                <div className="gp-scale-status measuring"><RefreshCw size={15} style={{ animation: "gp-pulse 1s ease-in-out infinite" }} /> Measuring...</div>
              )}
            </div>

            <div className="gp-scale-platform">
              <div className="gp-platform-top">🐐</div>
              <div className="gp-platform-mid"><div /><div /><div /></div>
              <div className="gp-platform-legs"><i /><i /><i /><i /></div>
            </div>
            <p className="gp-scale-instruction">Place {goat?.name || "the goat"} on the weighing platform</p>
          </div>

          <div className="gp-scale-save">
            <div>
              <h3>Weight reading</h3>
              <p>Save this reading to {goat?.name || "this goat"}'s weight history.</p>
            </div>
            <button type="button" className="gp-btn gp-btn-primary" onClick={handleSave}><Save size={17} /> Save Weight</button>
          </div>

          {saved && <div className="gp-scale-success"><CheckCircle size={18} /> {weight.toFixed(1)} kg saved to {goat?.name || "goat"}'s profile</div>}

          <div className="gp-scale-panel">
            <h3>Weighing scale connection</h3>
            <div className="gp-hw-flow">
              {hardwareFlow.map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className="gp-hw-node"><b>{node.label}</b><small>{node.note}</small></div>
                  {i < hardwareFlow.length - 1 && <span className="gp-hw-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="gp-scale-panel">
            <h3>Weight history</h3>
            {weightHistory.length === 0 ? (
              <p className="gp-hint" style={{ fontSize: 13 }}>No weight records yet for {goat?.name || "this goat"}.</p>
            ) : (
              weightHistory.map((item) => (
                <div className="gp-history-row" key={item.id}>
                  <div><strong>{item.title}</strong><small>{item.date}</small></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
    REPORT MODAL
  ========================================================= */

  function ReportModal({ goat, onClose, onExport }) {
    const events = goat.events || [];
    const boxes = [
      ["Goat", goat.name], ["Tag Number", goat.tagNumber], ["Breed", goat.breed], ["Gender", goat.gender],
      ["Stage", goat.stage], ["Weight", goat.weight != null ? `${goat.weight} kg` : null],
      ["Age", calcAge(goat.dob)], ["Source", goat.obtained],
    ];

    return (
      <Modal
        title="Goat Report"
        onClose={onClose}
        size="wide"
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Close</button>
            <button type="button" className="gp-btn gp-btn-primary" onClick={onExport}><Download size={16} /> Export PDF</button>
          </>
        }
      >
        <div className="gp-report-grid">
          {boxes.map(([label, value]) => (
            <div className="gp-report-box" key={label}>
              <div className="label">{label}</div>
              <strong>{value || "-"}</strong>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <h4 style={{ margin: "0 0 10px", color: "var(--navy)" }}>Events ({events.length})</h4>
          {events.length === 0 ? (
            <div style={{ padding: 18, background: "var(--bg-soft)", borderRadius: 10, color: "var(--text-faint)", fontSize: 13 }}>No events recorded.</div>
          ) : (
            events.slice().reverse().map((event) => (
              <div key={event.id} style={{ padding: "11px 12px", borderBottom: "1px solid var(--border-light)" }}>
                <strong style={{ color: "var(--navy)" }}>{event.title || event.type}</strong>
                <div style={{ color: "var(--text-faint)", fontSize: 11, marginTop: 3 }}>{event.date || "-"}</div>
              </div>
            ))
          )}
        </div>
      </Modal>
    );
  }

  /* =========================================================
    EDIT GOAT (config-driven form - one array instead of 12
    hand-written fields)
  ========================================================= */

  const EDIT_FIELDS = [
    { key: "tagNumber", label: "Tag Number" },
    { key: "name", label: "Name" },
    { key: "dob", label: "Birth Date", type: "date" },
    { key: "dateOfEntry", label: "Farm Entry", type: "date" },
    { key: "gender", label: "Gender", type: "select", options: ["Female", "Male"] },
    { key: "stage", label: "Stage", type: "select", options: (form) => STAGE_OPTIONS[form.gender] },
    { key: "weight", label: "Weight (kg)", type: "number" },
    { key: "breed", label: "Breed", type: "select", options: () => BREEDS.filter((b) => b !== "All Breeds") },
    { key: "obtained", label: "Source", type: "select", options: ["Born on farm", "Purchased", "Other"] },
    { key: "sireTagNumber", label: "Sire Tag Number" },
    { key: "damTagNumber", label: "Dam Tag Number" },
    { key: "notes", label: "Notes", type: "textarea", full: true },
  ];

  function EditGoatModal({ goat, onClose, onSave }) {
    const [form, setForm] = useState({
      tagNumber: goat.tagNumber || "", name: goat.name || "", dob: goat.dob || "",
      gender: goat.gender || "Female", stage: goat.stage || STAGE_OPTIONS[goat.gender || "Female"][0],
      weight: goat.weight ?? "", breed: goat.breed || "", dateOfEntry: goat.dateOfEntry || "",
      obtained: goat.obtained || "Born on farm", sireTagNumber: goat.sireTagNumber || "",
      damTagNumber: goat.damTagNumber || "", notes: goat.notes || "",
    });

    function update(key, value) {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "gender") next.stage = STAGE_OPTIONS[value][0]; // stage options depend on gender
        return next;
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      onSave({ ...goat, ...form, weight: form.weight !== "" ? Number(form.weight) : null });
    }

    return (
      <Modal
        title="Edit Goat"
        onClose={onClose}
        footer={
          <>
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" form="gp-edit-goat" className="gp-btn gp-btn-primary"><Check size={16} /> Save Changes</button>
          </>
        }
      >
        <form id="gp-edit-goat" onSubmit={handleSubmit} className="gp-modal-grid">
          {EDIT_FIELDS.map((f) => (
            <Field key={f.key} label={f.label} full={f.full}>
              {renderControl(f, form[f.key], (v) => update(f.key, v), form)}
            </Field>
          ))}
        </form>
      </Modal>
    );
  }

  /* =========================================================
    ADD GOAT FORM
  ========================================================= */

  function AddGoatForm({ breed, onClose, onSave }) {
    const [tagNumber, setTagNumber] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("Female");
    const [stage, setStage] = useState("Kid");
    const [dob, setDob] = useState("");
    const [dateOfEntry, setDateOfEntry] = useState("");
    const [weight, setWeight] = useState("");
    const [obtained, setObtained] = useState("Born on farm");
    const [sireTagNumber, setSireTagNumber] = useState("");
    const [damTagNumber, setDamTagNumber] = useState("");
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState("");

    function handlePhoto(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { setError("Photo size should be less than 5MB."); return; }
      setPhoto(URL.createObjectURL(file));
      setError("");
    }

    function handleGenderChange(newGender) {
      setGender(newGender);
      setStage(STAGE_OPTIONS[newGender][0]);
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (!tagNumber.trim()) return setError("Please enter the tag number.");
      if (!name.trim()) return setError("Please enter the goat name.");
      if (!dob) return setError("Please select the birth date.");

      const bornHere = obtained === "Born on farm";
      onSave({
        id: uid(), tagNumber: tagNumber.trim(), name: name.trim(), breed, gender, stage, dob,
        dateOfEntry: dateOfEntry || "", weight: weight ? Number(weight) : null, obtained,
        group: "All Groups",
        sireTagNumber: bornHere ? sireTagNumber.trim() : "",
        damTagNumber: bornHere ? damTagNumber.trim() : "",
        notes: "", photo, archived: false,
        events: [makeEvent("Registration", "Goat profile created")],
        createdAt: new Date().toISOString(),
      });
    }

    return (
      <div>
        <div className="gp-form-header">
          <div className="gp-form-header-inner">
            <button type="button" className="gp-form-back" onClick={onClose}><ArrowLeft size={20} /> Goats</button>
            <button type="submit" form="add-goat-form" className="gp-form-save">SAVE & CONTINUE</button>
          </div>
        </div>

        <form id="add-goat-form" onSubmit={handleSubmit} className="gp-form">
          <div className="gp-form-title">
            <div className="gp-eyebrow">GOAT MANAGEMENT</div>
            <h1>Add New Goat</h1>
            <p>Create a digital profile for your goat</p>
          </div>

          <section className="gp-photo-card">
            <div className="gp-photo-drop">
              {photo ? (
                <img src={photo} alt="Selected goat" />
              ) : (
                <>
                  <div className="gp-photo-icon">🐐</div>
                  <strong style={{ color: "#123B78" }}>Add Goat Photo</strong>
                  <span style={{ marginTop: 5, color: "var(--text-faint)", fontSize: 12 }}>Upload or drag & drop image</span>
                </>
              )}
            </div>
            <label className="gp-photo-upload">
              <Camera size={16} /> {photo ? "Change Photo" : "Upload Photo"}
              <input type="file" accept="image/*" onChange={handlePhoto} hidden />
            </label>
            <div style={{ marginTop: 7, color: "#9AACC9", fontSize: 10 }}>JPG, PNG or WEBP · Max 5MB</div>
          </section>

          <div className="gp-two-col">
            <section className="gp-form-card">
              <div className="gp-section-title">
                <div className="gp-section-icon"><Tag size={17} /></div>
                <div><span className="gp-section-num">01</span><h2>Identity</h2></div>
              </div>
              <div className="gp-visual-field">
                <div className="gp-field"><label>Tag Number</label></div>
                <div className="gp-visual-wrap">
                  <span className="gp-visual-prefix">#</span>
                  <input className="gp-visual-input" value={tagNumber} onChange={(e) => setTagNumber(e.target.value)} placeholder="214" />
                </div>
              </div>
              <Field label="Goat Name">
                <input className="gp-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bella" />
              </Field>
            </section>

            <section className="gp-form-card">
              <div className="gp-section-title">
                <div className="gp-section-icon"><Heart size={17} /></div>
                <div><span className="gp-section-num">02</span><h2>Classification</h2></div>
              </div>
              <div className="gp-field"><label>Breed</label></div>
              <div className="gp-readonly">{breed} <ChevronDown size={17} /></div>
              <div className="gp-field"><label>Gender</label></div>
              <div className="gp-gender-grid">
                {["Female", "Male"].map((item) => (
                  <button key={item} type="button" onClick={() => handleGenderChange(item)} className={`gp-gender-btn${gender === item ? " active" : ""}`}>
                    <span style={{ fontSize: 18 }}>{item === "Female" ? "♀" : "♂"}</span> {item}
                    {gender === item && <Check size={14} />}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="gp-form-card">
            <div className="gp-section-title">
              <div className="gp-section-icon"><CalendarDays size={17} /></div>
              <div><span className="gp-section-num">02A</span><h2>Goat Timeline</h2></div>
            </div>
            <div className="gp-three-col">
              <div className="gp-timeline-field">
                <div className="gp-timeline-icon"><CalendarDays size={18} /></div>
                <div>
                  <label>Birth Date</label>
                  <input className="gp-timeline-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>
              <div className="gp-timeline-field">
                <div className="gp-timeline-icon"><CalendarDays size={18} /></div>
                <div>
                  <label>Farm Entry</label>
                  <input className="gp-timeline-input" type="date" value={dateOfEntry} onChange={(e) => setDateOfEntry(e.target.value)} />
                </div>
              </div>
              <div className="gp-timeline-field">
                <div className="gp-timeline-icon"><Scale size={18} /></div>
                <div>
                  <label>Current Weight</label>
                  <div className="gp-weight-wrap">
                    <input className="gp-timeline-input" type="number" min="0" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="32.5" />
                    <span className="gp-kg">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="gp-form-card">
            <div className="gp-stage-row">
              <div>
                <label style={{ display: "block", marginBottom: 7, color: "var(--text-muted)", fontSize: 12, fontWeight: 700 }}>Life Stage</label>
                <p className="gp-hint">Changes according to gender</p>
              </div>
              <select className="gp-stage-select" value={stage} onChange={(e) => setStage(e.target.value)}>
                {STAGE_OPTIONS[gender].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </section>

          <section style={{ marginTop: 30 }}>
            <div className="gp-origin-heading">
              <div className="gp-origin-num">03</div>
              <div>
                <h2>How did this goat join your farm?</h2>
                <p className="gp-hint">Select one option</p>
              </div>
            </div>
            <div className="gp-origin-grid">
              {ORIGIN_OPTIONS.map((o) => (
                <button key={o.value} type="button" onClick={() => setObtained(o.value)} className={`gp-origin-card${obtained === o.value ? " active" : ""}`}>
                  <div className="gp-origin-icon">{o.icon}</div>
                  <div>
                    <strong className="gp-origin-title">{o.title}</strong>
                    <span className="gp-origin-subtitle">{o.subtitle}</span>
                  </div>
                  {obtained === o.value && <div className="gp-origin-check"><Check size={13} /></div>}
                </button>
              ))}
            </div>
          </section>

          {obtained === "Born on farm" && (
            <section className="gp-form-card">
              <div className="gp-section-title">
                <div className="gp-section-icon"><Tag size={17} /></div>
                <div><span className="gp-section-num">04</span><h2>Parent Details</h2></div>
              </div>
              <div className="gp-two-col">
                <Field label="Sire Tag Number">
                  <input className="gp-input" value={sireTagNumber} onChange={(e) => setSireTagNumber(e.target.value)} placeholder="Father's tag #" />
                </Field>
                <Field label="Dam Tag Number">
                  <input className="gp-input" value={damTagNumber} onChange={(e) => setDamTagNumber(e.target.value)} placeholder="Mother's tag #" />
                </Field>
              </div>
            </section>
          )}

          {error && <div className="gp-error">⚠️ {error}</div>}

          <div className="gp-form-actions">
            <button type="button" className="gp-btn gp-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="gp-btn gp-btn-primary">
              Create Goat Profile <ArrowLeft size={17} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </form>
      </div>
    );
  }